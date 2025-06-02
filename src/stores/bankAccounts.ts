import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { bankAccountsApi, type BankAccount, type BankAccountTransfer, type CreateTransferRequest } from '@/api/bankAccounts'

export const useBankAccountsStore = defineStore('bankAccounts', () => {
  const accounts = ref<BankAccount[]>([])
  const recentTransfers = ref<BankAccountTransfer[]>([])
  const loading = ref({
    accounts: false,
    transfers: false,
    transfer: false
  })
  const error = ref({
    accounts: null as string | null,
    transfers: null as string | null,
    transfer: null as string | null
  })

  async function fetchAccounts() {
    loading.value.accounts = true
    error.value.accounts = null

    try {
      const response = await bankAccountsApi.getMyAccounts()
      accounts.value = response.user_bank_accounts
      return response.user_bank_accounts
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro ao carregar contas bancárias'
      error.value.accounts = errorMessage
      console.error('Erro ao buscar contas:', err)
      return []
    } finally {
      loading.value.accounts = false
    }
  }

  async function fetchRecentTransfers(perPage = 3) {
    loading.value.transfers = true
    error.value.transfers = null

    try {
      const response = await bankAccountsApi.getTransfers({ per_page: perPage, page: 1 })
      recentTransfers.value = response.bank_account_transfers
      return response.bank_account_transfers
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro ao carregar transferências'
      error.value.transfers = errorMessage
      console.error('Erro ao buscar transferências:', err)
      return []
    } finally {
      loading.value.transfers = false
    }
  }

  async function createTransfer(transferData: CreateTransferRequest) {
    loading.value.transfer = true
    error.value.transfer = null

    try {
      const response = await bankAccountsApi.createTransfer(transferData)
      
      await fetchAccounts()
      await fetchRecentTransfers()
      
      return response
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro ao realizar transferência'
      error.value.transfer = errorMessage
      console.error('Erro ao criar transferência:', err)
      throw new Error(errorMessage)
    } finally {
      loading.value.transfer = false
    }
  }

  return {
    accounts,
    recentTransfers,
    loading,
    error,
    fetchAccounts,
    fetchRecentTransfers,
    createTransfer
  }
})
