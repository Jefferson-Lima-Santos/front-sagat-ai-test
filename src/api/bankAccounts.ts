import apiClient from './client'

export interface BankAccount {
  id: number
  bank_name: string
  bank_code: string
  agency_number: string
  agency_digit: string
  account_number: string
  account_digit: string
  account_type: string
  document: string
  holder_name: string
  created_at: string
  updated_at: string
  amount: number
}

export interface BankAccountsResponse {
  user_bank_accounts: BankAccount[]
}

export interface BankAccountInfo {
  bank_name: string
  bank_code: string
  agency_number: string
  agency_digit: string
  account_number: string
  account_digit: string
  account_type: string
  document: string
  holder_name: string
}

export interface BankAccountTransfer {
  id: number
  was_success: boolean
  transfer_type_text: string
  amount_to_transfer: number
  created_at: string
  to_bank_account: BankAccountInfo
  from_user_bank_account: BankAccountInfo
}

export interface BankAccountTransfersResponse {
  bank_account_transfers: BankAccountTransfer[]
  current_page: number
  per_page: number
  total_pages: number
  total_records: number
}

export interface CreateTransferRequest {
  bank_account_transfer: {
    to_user_bank_account_id: number
    from_user_bank_account_id: number
    transfer_type: number
    amount_to_transfer: number
  }
}

export interface CreateTransferResponse {
  message: string
}

export interface TransferFilters {
  start_date?: string
  end_date?: string
  min_value?: number
  max_value?: number
  transfer_type?: 'sent' | 'received' | ''
  per_page?: number
  page?: number
}

export const bankAccountsApi = {
  getMyAccounts: async (): Promise<BankAccountsResponse> => {
    const response = await apiClient.get('/v1/users/bank_accounts/my')
    return response.data
  },

  getTransfers: async (filters: TransferFilters = {}): Promise<BankAccountTransfersResponse> => {
    const { 
      per_page = 3, 
      page = 1,
      start_date,
      end_date,
      min_value,
      max_value,
      transfer_type 
    } = filters

    const params: Record<string, any> = { per_page, page }
    if (start_date) params.start_date = start_date
    if (end_date) params.end_date = end_date
    if (min_value) params.min_value = min_value
    if (max_value) params.max_value = max_value
    if (transfer_type) params.transfer_type = transfer_type

    const response = await apiClient.get('/v1/users/bank_account_transfers/statements', {
      params
    })
    return response.data
  },

  createTransfer: async (data: CreateTransferRequest): Promise<CreateTransferResponse> => {
    const response = await apiClient.post('/v1/users/bank_account_transfers', data)
    return response.data
  }
}
