<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { tokens } from '../locales/tokens';
import { bankAccountsApi, type BankAccountTransfer } from '../api/bankAccounts';

const { t } = useI18n();
const loading = ref(false);
const isLoadingMore = ref(false);

const statements = ref<BankAccountTransfer[]>([]);
const totalPages = ref(1);
const currentPage = ref(1);
const hasMore = computed(() => {
  return currentPage.value < totalPages.value;
});

const filters = reactive<{
  start_date: string;
  end_date: string;
  min_value: number | undefined;
  max_value: number | undefined;
  transfer_type: "" | "sent" | "received" | undefined;
  per_page: number;
  page: number;
}>({
  start_date: '',
  end_date: '',
  min_value: undefined,
  max_value: undefined,
  transfer_type: '',
  per_page: 2,
  page: 1
});

const datePickerConfig = reactive({
  startMenuOpen: false,
  endMenuOpen: false
});


const hasStatements = computed(() => statements.value.length > 0);

const showEmptyState = computed(() => !hasStatements.value && !loading.value);

async function loadMore(options: { side: string; done: (status: 'ok' | 'empty' | 'error') => void }) {
  const { done } = options;
  

  if (loading.value) {
    done('ok');
    return;
  }
  

  if (!hasMore.value) {
    done('empty');
    return;
  }
  

  if (isLoadingMore.value) {
    done('ok');
    return;
  }
  
  try {
    isLoadingMore.value = true;
    loading.value = true;
    

    currentPage.value++;
    filters.page = currentPage.value;
    

    const response = await bankAccountsApi.getTransfers(filters);
    

    if (response.bank_account_transfers && response.bank_account_transfers.length > 0) {
      statements.value = [...statements.value, ...response.bank_account_transfers];
    }
    

    totalPages.value = response.total_pages;
    

    if (currentPage.value >= totalPages.value) {

      done('empty');
    } else {

      done('ok');
    }
  } catch (error) {
    console.error('Error loading more data:', error);
    done('error');
  } finally {
    loading.value = false;

    setTimeout(() => {
      isLoadingMore.value = false;
    }, 300);
  }
}

async function fetchStatements() {
  statements.value = [];
  currentPage.value = 1;
  filters.page = 1;
  loading.value = true;
  isLoadingMore.value = false;
  
  try {
    const response = await bankAccountsApi.getTransfers(filters);
    

    statements.value = response.bank_account_transfers || [];
    totalPages.value = response.total_pages || 1;
    currentPage.value = response.current_page || 1;
    
  } catch (error) {
    console.error('Error fetching statements:', error);
  } finally {
    loading.value = false;
  }
}

function applyFilters() {
  fetchStatements();
}

function clearFilters() {
  filters.start_date = '';
  filters.end_date = '';
  filters.min_value = undefined;
  filters.max_value = undefined;
  filters.transfer_type = '';
  fetchStatements();
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  } catch (e) {
    return dateString;
  }
}

function isOutgoingTransfer(transfer: BankAccountTransfer): boolean {
  return transfer.transfer_type_text === 'sent';
}

function getTransferClass(transfer: BankAccountTransfer): string {
  if (!transfer.was_success) return 'text-grey';
  return isOutgoingTransfer(transfer) ? 'text-error' : 'text-success';
}

onMounted(() => {
  fetchStatements();
});

</script>

<template>
  <div class="statements-container">
    <v-card flat class="mb-4 pa-4">
      <v-card-title class="text-h5 mb-4">{{ t(tokens.admin.statements.title) }}</v-card-title>
      
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6" lg="3" class="filter-col">
            <v-menu
              v-model="datePickerConfig.startMenuOpen"
              :close-on-content-click="false"
            >
              <template v-slot:activator="{ props }">
                <v-text-field
                  v-model="filters.start_date"
                  :label="t(tokens.admin.statements.startDate)"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="props"
                  clearable
                  @click:clear="filters.start_date = ''"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="filters.start_date"
                @update:model-value="datePickerConfig.startMenuOpen = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          
          <v-col cols="12" md="6" lg="3" class="filter-col">
            <v-menu
              v-model="datePickerConfig.endMenuOpen"
              :close-on-content-click="false"
            >
              <template v-slot:activator="{ props }">
                <v-text-field
                  v-model="filters.end_date"
                  :label="t(tokens.admin.statements.endDate)"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="props"
                  clearable
                  @click:clear="filters.end_date = ''"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="filters.end_date"
                @update:model-value="datePickerConfig.endMenuOpen = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          
          <v-col cols="12" md="6" lg="2" class="filter-col">
            <v-text-field
              v-model="filters.min_value"
              type="number"
              :label="t(tokens.admin.statements.minValue)"
              prefix="R$"
              prepend-icon="mdi-currency-brl"
              clearable
              @click:clear="filters.min_value = undefined"
            ></v-text-field>
          </v-col>
          
          <v-col cols="12" md="6" lg="2" class="filter-col">
            <v-text-field
              v-model="filters.max_value"
              type="number"
              :label="t(tokens.admin.statements.maxValue)"
              prefix="R$"
              prepend-icon="mdi-currency-brl"
              clearable
              @click:clear="filters.max_value = undefined"
            ></v-text-field>
          </v-col>
          
          <v-col cols="12" md="6" lg="2" class="filter-col">
            <v-select
              v-model="filters.transfer_type"
              :items=" [
                { title: t(tokens.admin.statements.all), value: '' },
                { title: t(tokens.admin.statements.sent), value: 'sent' },
                { title: t(tokens.admin.statements.received), value: 'received' }
              ]"
              item-title="title"
              item-value="value"
              :label="t(tokens.admin.statements.transferType)"
              prepend-icon="mdi-swap-horizontal"
            ></v-select>
          </v-col>
        </v-row>
        
        <div class="d-flex justify-end">
          <v-btn
            color="grey-darken-1"
            variant="text"
            class="mr-2"
            @click="clearFilters"
          >
            {{ t(tokens.admin.statements.clearFilters) }}
          </v-btn>
          
          <v-btn
            color="primary"
            @click="applyFilters"
            :loading="loading"
          >
            {{ t(tokens.admin.statements.applyFilters) }}
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
    
    <v-card>
      <v-card-text>
        <div v-if="loading && !statements.length" class="d-flex justify-center py-4">
          <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
        </div>
        
        <v-infinite-scroll 
          v-if="!showEmptyState"
          height="500"
          :items="statements"
          @load="loadMore"
          class="statements-scroll"
        >
          <template v-for="(transfer, index) in statements" :key="transfer.id">
            <div :class="['pa-4', index % 2 === 0 ? 'bg-grey-lighten-3' : '']">
              <v-row align="center">
                <v-col cols="12" sm="2" class="text-center justify-center">
                  <div class="d-flex align-center justify-center">
                    <v-avatar
                      :color="getTransferClass(transfer)"
                      size="36"
                      class="mr-3"
                    >
                      <v-icon
                        :icon="isOutgoingTransfer(transfer) ? 'mdi-arrow-up' : 'mdi-arrow-down'"
                        :color="isOutgoingTransfer(transfer) ? 'red' : 'black'"
                      ></v-icon>
                    </v-avatar>
                    <div>
                      <div class="text-subtitle-2 font-weight-medium" :class="getTransferClass(transfer)">
                        {{ formatCurrency(transfer.amount_to_transfer) }}
                      </div>
                      <div class="text-caption text-medium-emphasis">
                        {{ formatDate(transfer.created_at) }}
                      </div>
                    </div>
                  </div>
                </v-col>
                
                <v-col cols="12" sm="4" class="text-center justify-center">
                  <div class="text-subtitle-2">
                    {{ t(tokens.admin.statements.fromAccount) }}:
                  </div>
                  <div class="text-body-2">
                    {{ transfer.from_user_bank_account.bank_name }} - 
                    {{ transfer.from_user_bank_account.account_number }}-{{ transfer.from_user_bank_account.account_digit }}
                  </div>
                  <div class="text-caption text-medium-emphasis">
                    {{ transfer.from_user_bank_account.holder_name }}
                  </div>
                </v-col>
                
                <v-col cols="12" sm="4" class="text-center justify-center">
                  <div class="text-subtitle-2">
                    {{ t(tokens.admin.statements.toAccount) }}:
                  </div>
                  <div class="text-body-2">
                    {{ transfer.to_bank_account.bank_name }} - 
                    {{ transfer.to_bank_account.account_number }}-{{ transfer.to_bank_account.account_digit }}
                  </div>
                  <div class="text-caption text-medium-emphasis">
                    {{ transfer.to_bank_account.holder_name }}
                  </div>
                </v-col>
                
                <v-col cols="12" sm="2" class="justify-center text-center">
                  <v-chip
                    :color="transfer.was_success ? 'success' : 'error'"
                    text-color="white"
                    size="small"
                    class="mb-1"
                  >
                    {{ transfer.was_success ? t(tokens.admin.statements.successful) : t(tokens.admin.statements.failed) }}
                  </v-chip>
                  <div class="text-caption">
                    {{ transfer.transfer_type_text }}
                  </div>
                </v-col>
              </v-row>
            </div>
          </template>

          <template v-slot:loading>
            <div class="d-flex justify-center py-4">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </div>
          </template>
        </v-infinite-scroll>

        <div v-if="!hasMore && hasStatements && !showEmptyState" class="text-center py-3">
          <div class="text-body-2 text-medium-emphasis">{{ t(tokens.admin.statements.noMoreData) }}</div>
        </div>
        
        <div v-if="showEmptyState" class="text-center py-6">
          <v-icon icon="mdi-bank-off" size="large" class="mb-2"></v-icon>
          <div class="text-body-1">{{ t(tokens.admin.statements.noTransfers) }}</div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>
.statements-container {
  padding: 1rem;
}

.text-success {
  color: #4caf50 !important;
}

.text-error {
  color: #f44336 !important;
}

.text-grey {
  color: #9e9e9e !important;
}

.statements-scroll {
  width: 100%;
}

.filter-col {
  min-width: 300px;
  max-width: 100%;
  flex: 1 1 300px;
  padding-right: 8px;
  padding-left: 8px;
  box-sizing: border-box;
}
@media (max-width: 960px) {
  .filter-col {
    min-width: 100% !important;
    padding-right: 0;
    padding-left: 0;
  }
}
</style>
