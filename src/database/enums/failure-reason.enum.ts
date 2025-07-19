export enum FailureReason {
  INSUFFICIENT_FUNDS = 1, // Saldo insuficiente
  INVALID_ACCOUNT = 2, // Conta de destino inválida ou inexistente
  ACCOUNT_BLOCKED = 3, // Conta está bloqueada para transações
  LIMIT_EXCEEDED = 4, // Valor excede o limite permitido
  NETWORK_ERROR = 5, // Falha na comunicação com o sistema
  DUPLICATE_TRANSACTION = 6, // Transação duplicada detectada
  INTERNAL_ERROR = 7, // Erro inesperado no sistema
  CURRENCY_MISMATCH = 8, // Moeda da conta e da transação não coincidem
  TIMEOUT = 9, // Tempo limite atingido
  UNAUTHORIZED = 10, // Conta sem permissão para realizar a transação
}
