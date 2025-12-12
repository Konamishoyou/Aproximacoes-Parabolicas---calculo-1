# Relatório Técnico - Aproximações Parabólicas

## Introdução

Este relatório apresenta a análise de quatro diferentes métodos de aproximação parabólica aplicados a um conjunto de dados observados.

## Metodologia

### Dados Observados
| t | N(t) |
|---|------|
| 0 | 21.5 |
| 3 | 19.8 |
| 6 | 20.0 |
| 9 | 22.2 |
| 12 | 24.8 |
| 15 | 25.8 |

### Métodos Aplicados

#### 1. Translação Simples (f₁)
- Equação: f₁(t) = (t - 3)² + 19.8
- Descrição: Translação da parábola básica

#### 2. Translação com Escala (f₂)
- Equação: f₂(t) = 0.0410468(t - 3)² + 19.8
- Descrição: Adiciona fator de escala

#### 3. Mínimos Quadrados com c Fixo (f₃)
- Método: Regressão linear múltipla
- Sistema: Xβ = Y

#### 4. Mínimos Quadrados Completo (f₄)
- Método: Regressão linear múltipla completa
- Sistema: X̃β̃ = Ỹ

## Resultados

[Inserir tabelas de comparação e gráficos]

## Conclusão

O método dos Mínimos Quadrados completo (f₄) apresentou os melhores resultados.
