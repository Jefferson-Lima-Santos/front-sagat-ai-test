<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useBankAccountsStore } from '@/stores/bankAccounts'
import type { BankAccount } from '@/api/bankAccounts'
import { useI18n } from 'vue-i18n'
import { tokens } from '@/locales/tokens'

const { t } = useI18n()
const props = defineProps<{
  open: boolean
  sourceAccount?: BankAccount
}>()

const emit = defineEmits(['close', 'success'])

const bankAccountsStore = useBankAccountsStore()

const selectedSourceAccount = ref<number | null>(props.sourceAccount?.id || null)
const selectedDestinationAccount = ref<number | null>(null)
const amount = ref('')
const transferType = ref(1)
const loading = ref(false)
const error = ref('')

const sourceAccounts = computed(() => {
  return bankAccountsStore.accounts
})

const destinationAccounts = computed(() => {
  return bankAccountsStore.accounts.filter(account => account.id !== selectedSourceAccount.value)
})

watch(
  () => props.sourceAccount,
  (newVal) => {
    if (newVal) {
      selectedSourceAccount.value = newVal.id
    }
  }
)

const handleClose = () => {
  selectedSourceAccount.value = props.sourceAccount?.id || null
  selectedDestinationAccount.value = null
  amount.value = ''
  error.value = ''
  emit('close')
}

const handleSubmit = async () => {
  if (!selectedSourceAccount.value || !selectedDestinationAccount.value) {
    error.value = t(tokens.admin.bankTransfer.selectAccounts)
    return
  }

  const amountNumber = parseFloat(amount.value)
  if (isNaN(amountNumber) || amountNumber <= 0) {
    error.value = t(tokens.admin.bankTransfer.invalidAmount)
    return
  }

  const sourceAccount = sourceAccounts.value.find(acc => acc.id === selectedSourceAccount.value)
  if (sourceAccount && sourceAccount.amount < amountNumber) {
    error.value = t(tokens.admin.bankTransfer.insufficientFunds)
    return
  }

  loading.value = true
  error.value = ''

  try {
    await bankAccountsStore.createTransfer({
      bank_account_transfer: {
        from_user_bank_account_id: selectedSourceAccount.value,
        to_user_bank_account_id: selectedDestinationAccount.value,
        amount_to_transfer: amountNumber,
        transfer_type: transferType.value
      }
    })

    emit('success')
    handleClose()
  } catch (err: any) {
    error.value = err.message || t(tokens.admin.bankTransfer.transferFailed)
  } finally {
    loading.value = false
  }
}

const formatAccountNumber = (account: BankAccount) => {
  return `${account.agency_number}-${account.agency_digit} / ${account.account_number}-${account.account_digit}`
}
</script>

<template>
  <v-dialog v-model="props.open" max-width="600px">
    <v-card>
      <v-card-title class="text-h5">
        {{ t(tokens.admin.bankTransfer.newTransfer) }}
      </v-card-title>

      <v-card-text>
        <v-alert
          v-if="error"
          type="error"
          variant="tonal"
          closable
          class="mb-4"
          @click:close="error = ''"
        >
          {{ error }}
        </v-alert>

        <v-form @submit.prevent="handleSubmit">
          <v-select
            v-model="selectedSourceAccount"
            :items="sourceAccounts"
            item-title="bank_name"
            item-value="id"
            :label="t(tokens.admin.bankTransfer.sourceAccount)"
            required
            variant="outlined"
            class="mb-4"
          >
            <template v-slot:item="{ item, props: itemProps }">
              <v-list-item v-bind="itemProps">
                <template v-slot:prepend>
                  <v-icon icon="mdi-bank-outline" class="mr-2"></v-icon>
                </template>
                <v-list-item-title>
                  {{ item.raw.bank_name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ formatAccountNumber(item.raw) }} • {{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.raw.amount) }}
                </v-list-item-subtitle>
              </v-list-item>
            </template>
          </v-select>

          <v-select
            v-model="selectedDestinationAccount"
            :items="destinationAccounts"
            item-title="bank_name"
            item-value="id"
            :label="t(tokens.admin.bankTransfer.destinationAccount)"
            required
            variant="outlined"
            class="mb-4"
            :disabled="!selectedSourceAccount"
          >
            <template v-slot:item="{ item, props: itemProps }">
              <v-list-item v-bind="itemProps">
                <template v-slot:prepend>
                  <v-icon icon="mdi-bank-outline" class="mr-2"></v-icon>
                </template>
                <v-list-item-title>
                  {{ item.raw.bank_name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ formatAccountNumber(item.raw) }}
                </v-list-item-subtitle>
              </v-list-item>
            </template>
          </v-select>

          <v-text-field
            v-model="amount"
            :label="t(tokens.admin.bankTransfer.amount)"
            prefix="R$"
            type="number"
            min="0.01"
            step="0.01"
            required
            variant="outlined"
            class="mb-4"
          ></v-text-field>

          <v-radio-group v-model="transferType" inline class="mb-2">
            <template v-slot:label>
              <div>{{ t(tokens.admin.bankTransfer.transferType) }}</div>
            </template>
            <v-radio value="1" :label="t(tokens.admin.bankTransfer.pix)"></v-radio>
            <v-radio value="2" :label="t(tokens.admin.bankTransfer.ted)"></v-radio>
          </v-radio-group>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="grey-darken-1"
          variant="text"
          @click="handleClose"
        >
          {{ t(tokens.admin.bankTransfer.cancel) }}
        </v-btn>
        <v-btn
          color="primary"
          variant="elevated"
          @click="handleSubmit"
          :loading="loading"
          :disabled="loading"
        >
          {{ t(tokens.admin.bankTransfer.transfer) }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
