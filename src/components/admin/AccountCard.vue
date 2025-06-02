<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { tokens } from '@/locales/tokens'
import type { BankAccount, BankAccountTransfer } from '@/api/bankAccounts'

const { t } = useI18n()
const props = defineProps<{
  account: BankAccount
  transfers: BankAccountTransfer[]
}>()

const emit = defineEmits(['new-transfer'])

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  } catch (e) {
    return dateString
  }
}

const isOutgoingTransfer = (transfer: BankAccountTransfer) => {
  return transfer.from_user_bank_account.account_number === props.account.account_number
}

const getTransferAmount = (transfer: BankAccountTransfer) => {
  return isOutgoingTransfer(transfer) 
    ? -transfer.amount_to_transfer 
    : transfer.amount_to_transfer
}

const getTransferClass = (transfer: BankAccountTransfer) => {
  if (!transfer.was_success) return 'text-grey'
  return isOutgoingTransfer(transfer) ? 'text-error' : 'text-success'
}

const formattedAccountNumber = computed(() => {
  const account = props.account
  return `${account.agency_number}-${account.agency_digit} / ${account.account_number}-${account.account_digit}`
})
</script>

<template>
  <v-card class="account-card" elevation="2">
    <v-card-item>
      <v-card-title>{{ account.bank_name }}</v-card-title>
      <v-card-subtitle class="pb-0">
        {{ account.account_type === 'corrente' ? t('admin.bankAccount.currentAccount') : t('admin.bankAccount.savingsAccount') }}
      </v-card-subtitle>
      
      <div class="mt-3">
        <v-row>
          <v-col cols="6">
            <div class="text-caption text-medium-emphasis mb-1">{{ t('admin.bankAccount.accountHolder') }}</div>
            <div class="text-body-2 font-weight-medium">{{ account.holder_name }}</div>
          </v-col>
          <v-col cols="6">
            <div class="text-caption text-medium-emphasis mb-1">{{ t('admin.bankAccount.accountNumber') }}</div>
            <div class="text-body-2 font-weight-medium">{{ formattedAccountNumber }}</div>
          </v-col>
        </v-row>
        
        <v-row class="mt-3">
          <v-col cols="12">
            <div class="text-caption text-medium-emphasis mb-1">{{ t('admin.bankAccount.availableBalance') }}</div>
            <div class="text-h6 font-weight-bold" :class="account.amount > 0 ? 'text-success' : 'text-error'">
              {{ formatCurrency(account.amount) }}
            </div>
          </v-col>
        </v-row>
      </div>
    </v-card-item>
    
    <v-divider></v-divider>
    
    <v-card-text class="pt-4">
      <div class="text-subtitle-2 font-weight-medium mb-3">{{ t('admin.bankAccount.recentTransactions') }}</div>
      
      <div v-if="transfers.length === 0" class="text-center py-4 text-medium-emphasis">
        <v-icon icon="mdi-bank-transfer" size="large" class="mb-2"></v-icon>
        <div>{{ t('admin.bankAccount.noRecentTransactions') }}</div>
      </div>
      
      <v-list v-else density="compact">
        <v-list-item
          v-for="transfer in transfers"
          :key="transfer.id"
          :class="transfer.was_success ? '' : 'bg-grey-lighten-5'"
        >
          <template v-slot:prepend>
            <v-avatar :color="getTransferClass(transfer)" size="32" class="mr-2">
              <v-icon
                :icon="isOutgoingTransfer(transfer) ? 'mdi-arrow-up' : 'mdi-arrow-down'"
                color="white"
                size="small"
              ></v-icon>
            </v-avatar>
          </template>
          
          <v-list-item-title
            :class="getTransferClass(transfer)"
            class="font-weight-medium"
          >
            {{ formatCurrency(getTransferAmount(transfer)) }}
          </v-list-item-title>
          
          <v-list-item-subtitle>
            <span v-if="transfer.was_success">
              {{ isOutgoingTransfer(transfer) ? t(tokens.admin.bankAccount.to) : t(tokens.admin.bankAccount.from) }}
              {{ isOutgoingTransfer(transfer) ? transfer.to_bank_account.holder_name : transfer.from_user_bank_account.holder_name }}
            </span>
            <span v-else class="text-error text-caption">
              {{ t(tokens.admin.bankAccount.transferFailed) }}
            </span>
          </v-list-item-subtitle>
          
          <template v-slot:append>
            <div class="text-caption">
              {{ formatDate(transfer.created_at) }}
            </div>
          </template>
        </v-list-item>
      </v-list>
      
      <div class="d-flex justify-end mt-2">
        <v-btn
          variant="text"
          density="comfortable"
          color="primary"
          size="small"
          prepend-icon="mdi-bank-transfer-out"
          @click="emit('new-transfer', account)"
        >
          {{ t(tokens.admin.bankTransfer.newTransfer) }}
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.text-success {
  color: #4caf50 !important;
}

.text-error {
  color: #f44336 !important;
}

.text-grey {
  color: #9e9e9e !important;
}
</style>
