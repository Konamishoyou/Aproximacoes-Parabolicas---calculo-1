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

Tabela f₁(t)
| t | N(t) | f(t) | Erro Abs | Erro Rel(%) |
| --- | --- | ---- | -------- | ----------- |
| 0 | 21.5 | 28.8000 | 7.3000 | 33.95% |
| 3 |	19.8 |	19.8000 |	0.0000 | 0.00% |
| 6 |	20 |	28.8000 |	8.8000 | 	44.00% |
| 9 |	22.2 | 55.8000 |	33.6000 |	151.35% |
| 12 |	24.8 |	100.8000 |	76.0000 |	306.45% |
| 15 |	25.8 |	163.8000 |	138.0000 |	534.88% |
| TOTAIS:|   |   |263.7000 |	1070.64% |

Tabela f₃(t)
| t |	N(t) |	f(t) |	Erro Abs |	Erro Rel (%) |
| --- | --- | ---- | -------- | ----------- |
| 0 |	21.5 |	21.5000 |	0.0000 |	0.00% |
| 3 |	19.8 |	20.6274 |	0.8274 |	4.18% |
| 6 |	20 |	20.6971 |	0.6971 |	3.49% |
| 9 |	22.2 |	21.7090 |	0.4910 |	2.21% |
| 12 |	24.8 |	23.6632 |	1.1368 |	4.58% |
| 15 |	25.8 |	26.5595 |	0.7595 |	2.94% |
| TOTAIS: |   |   | 	3.9119 |	17.40% |

 MELHOR APROXIMAÇÃO: f₃(t)

Esta função apresenta o menor erro total absoluto entre todas as aproximações testadas.

## Conclusão

O método dos Mínimos Quadrados completo (f₄) apresentou os melhores resultados.
