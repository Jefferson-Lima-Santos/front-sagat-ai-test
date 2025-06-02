<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { tokens } from '../locales/tokens';
import { useAuthStore } from '../stores/auth';
import { useBankAccountsStore } from '../stores/bankAccounts';
import AccountCard from '../components/admin/AccountCard.vue';
import NewTransferModal from '../components/admin/NewTransferModal.vue';
import type { BankAccount } from '../api/bankAccounts';

const { t } = useI18n();
const authStore = useAuthStore();
const bankAccountsStore = useBankAccountsStore();

const isLoading = ref(true);
const transferModalOpen = ref(false);
const selectedAccount = ref<BankAccount | undefined>(undefined);

onMounted(async () => {
  isLoading.value = true;
  try {
    await Promise.all([
      bankAccountsStore.fetchAccounts(),
      bankAccountsStore.fetchRecentTransfers(3)
    ]);
  } catch (error) {
    console.error('Erro ao carregar dados do dashboard:', error);
  } finally {
    isLoading.value = false;
  }
});
const openTransferModal = (account?: BankAccount) => {
  selectedAccount.value = account;
  transferModalOpen.value = true;
};

const handleTransferSuccess = () => {
  bankAccountsStore.fetchAccounts();
  bankAccountsStore.fetchRecentTransfers(3);
};
</script>

<template>
  <div class="admin-dashboard">
    <v-card flat class="mx-auto my-4 px-4 py-4">
      <v-card-title class="text-h5 mb-4">{{ t(tokens.admin.dashboard) }}</v-card-title>

      <v-card-text>
        <v-card class="mb-6">
          <v-card-item>
            <v-card-title>
              {{ t(tokens.admin.welcome) }}, {{ authStore.user?.name || 'Usuário' }}
            </v-card-title>
            <v-card-subtitle class="mt-2">
              {{ t(tokens.admin.welcomeMessage) }}
            </v-card-subtitle>
          </v-card-item>
        </v-card>


        <div v-if="isLoading" class="d-flex justify-center py-8">
          <v-progress-circular
            indeterminate
            color="primary"
            size="64"
          ></v-progress-circular>
        </div>

        <div v-else>
          <h2 class="text-h6 mb-4">Minhas Contas</h2>
          
          <v-alert
            v-if="!bankAccountsStore.accounts || bankAccountsStore.accounts.length === 0"
            type="info"
            variant="tonal"
            class="text-center"
          >
            <p class="mb-3">Você ainda não possui contas bancárias cadastradas.</p>
            <v-btn color="primary">Adicionar Nova Conta</v-btn>
          </v-alert>

          <v-row v-else>
            <v-col
              v-for="account in bankAccountsStore.accounts"
              :key="account.id"
              cols="12"
              md="6"
              lg="4"
            >
              <AccountCard
                :account="account"
                :transfers="bankAccountsStore.recentTransfers.filter(t => 
                  t.from_user_bank_account.account_number === account.account_number || 
                  t.to_bank_account.account_number === account.account_number
                )"
                @new-transfer="openTransferModal(account)"
              />
            </v-col>
          </v-row>
        </div>
      </v-card-text>
    </v-card>

    <NewTransferModal
      :open="transferModalOpen"
      :source-account="selectedAccount"
      @close="transferModalOpen = false"
      @success="handleTransferSuccess"
    />
  </div>
</template>

<style scoped>
.admin-dashboard {
  max-width: 100%;
  overflow-x: hidden;
  padding: 16px;
}
</style>
