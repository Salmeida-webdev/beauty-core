# Beauty Core - Chat B - B139 - Diagnostico lint global

- Inicio: 2026-09-15T15:43:06.6321796-03:00
- Fim: 2026-09-15T15:44:52.3146199-03:00
- Script: B139-terminal-v1
- Modo: somente leitura; nenhum arquivo foi alterado.

## Resultado

- ESLint exit code: 134
- Arquivos analisados: 0
- Diagnosticos: 0
- Erros: 0
- Avisos: 0

## Regras agrupadas


## Arquivos agrupados


## Falha de leitura JSON

- Matriz inválida transmitida, ',' esperada. (6): [7248:000001605CF15000]   104248 ms: Scavenge 2040.6 (2086.2) -> 2037.8 (2094.7) MB, pooled: 0 MB, 6.43 / 0.00 ms  (average mu = 0.331, current mu = 0.164) allocation failure; 
[7248:000001605CF15000]

## Saida bruta do ESLint

```text
System.Management.Automation.RemoteException
<--- Last few GCs --->
System.Management.Automation.RemoteException
[7248:000001605CF15000]   104248 ms: Scavenge 2040.6 (2086.2) -> 2037.8 (2094.7) MB, pooled: 0 MB, 6.43 / 0.00 ms  (average mu = 0.331, current mu = 0.164) allocation failure; 
[7248:000001605CF15000]   105210 ms: Mark-Compact (reduce) 2045.4 (2095.0) -> 2041.5 (2084.2) MB, pooled: 0 MB, 748.74 / 0.00 ms  (+ 116.8 ms in 0 steps since start of marking, biggest step 0.0 ms, walltime since start of marking 962 ms) (average mu = 0.2
System.Management.Automation.RemoteException
<--- JS stacktrace --->
System.Management.Automation.RemoteException
FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
----- Native stack trace -----
System.Management.Automation.RemoteException
 1: 00007FF611F40CD7 node::SetCppgcReference+16599
 2: 00007FF611EA4568 v8::base::CPU::num_virtual_address_bits+103336
 3: 00007FF612A153B1 v8::Isolate::ReportExternalAllocationLimitReached+65
 4: 00007FF612A01F36 v8::Function::Experimental_IsNopFunction+3302
 5: 00007FF61285E870 v8::internal::StrongRootAllocatorBase::StrongRootAllocatorBase+33904
 6: 00007FF61285AEFA v8::internal::StrongRootAllocatorBase::StrongRootAllocatorBase+19194
 7: 00007FF61287139C v8::Isolate::GetHeapProfiler+7692
 8: 00007FF612871C1A v8::Isolate::GetHeapProfiler+9866
 9: 00007FF61288260B v8::Isolate::GetHeapProfiler+77947
10: 00007FF61254F90B v8::base::AddressSpaceReservation::AddressSpaceReservation+323419
11: 000001607CF2D4BA 
```

## Operacoes nao executadas

- Nenhum arquivo foi alterado.
- Nenhum --fix, Jest, build, E2E, migration, workflow ou operacao Git foi executado.

Status: PASS_WITH_ATTENTION
