import React, { useState } from 'react';
import { Calculator, ChevronDown, ChevronUp, LineChart } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';

const TrabalhoCalculo = () => {
  const [expandedSections, setExpandedSections] = useState({
    ex1: true,
    ex2: true,
    ex3: true,
    ex4: true,
    ex5: true,
    ex6: true,
    graficos: true
  });

  // Dados observados
  const dados = [
    { t: 0, N: 21.5 },
    { t: 3, N: 19.8 },
    { t: 6, N: 20.0 },
    { t: 9, N: 22.2 },
    { t: 12, N: 24.8 },
    { t: 15, N: 25.8 }
  ];

  // EXERCÍCIO 1: Explicitar f2(x)
  const exercicio1 = () => {
    const c_inv = 0.0410468;
    const c = 1 / c_inv;
    
    return {
      c_inv: c_inv.toFixed(7),
      c: c.toFixed(4),
      formula: `f₂(t) = ${c_inv.toFixed(7)}(t - 3)² + 19.8`,
      formulaSimplificada: `f₂(t) ≈ 0.0410468(t - 3)² + 19.8`
    };
  };

  // Função auxiliar para multiplicação de matrizes
  const multiplicarMatrizes = (A, B) => {
    const linhasA = A.length;
    const colunasA = A[0].length;
    const colunasB = B[0].length;
    const resultado = [];

    for (let i = 0; i < linhasA; i++) {
      resultado[i] = [];
      for (let j = 0; j < colunasB; j++) {
        let soma = 0;
        for (let k = 0; k < colunasA; k++) {
          soma += A[i][k] * B[k][j];
        }
        resultado[i][j] = soma;
      }
    }
    return resultado;
  };

  // Função para transpor matriz
  const transpor = (matriz) => {
    const linhas = matriz.length;
    const colunas = matriz[0].length;
    const resultado = [];

    for (let j = 0; j < colunas; j++) {
      resultado[j] = [];
      for (let i = 0; i < linhas; i++) {
        resultado[j][i] = matriz[i][j];
      }
    }
    return resultado;
  };

  // Função para inverter matriz 2x2
  const inverter2x2 = (matriz) => {
    const a = matriz[0][0];
    const b = matriz[0][1];
    const c = matriz[1][0];
    const d = matriz[1][1];
    const det = a * d - b * c;

    return [
      [d / det, -b / det],
      [-c / det, a / det]
    ];
  };

  // Função para inverter matriz 3x3
  const inverter3x3 = (m) => {
    const det = 
      m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
      m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
      m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);

    const inv = [
      [
        (m[1][1] * m[2][2] - m[1][2] * m[2][1]) / det,
        (m[0][2] * m[2][1] - m[0][1] * m[2][2]) / det,
        (m[0][1] * m[1][2] - m[0][2] * m[1][1]) / det
      ],
      [
        (m[1][2] * m[2][0] - m[1][0] * m[2][2]) / det,
        (m[0][0] * m[2][2] - m[0][2] * m[2][0]) / det,
        (m[0][2] * m[1][0] - m[0][0] * m[1][2]) / det
      ],
      [
        (m[1][0] * m[2][1] - m[1][1] * m[2][0]) / det,
        (m[0][1] * m[2][0] - m[0][0] * m[2][1]) / det,
        (m[0][0] * m[1][1] - m[0][1] * m[1][0]) / det
      ]
    ];

    return inv;
  };

  // EXERCÍCIO 2 e 3
  const exercicio2e3 = () => {
    const X = [
      [9, 3],
      [36, 6],
      [81, 9],
      [144, 12],
      [225, 15]
    ];

    const Y = [[-1.7], [-1.5], [0.7], [3.3], [4.3]];

    const X_T = transpor(X);
    const X_T_X = multiplicarMatrizes(X_T, X);
    const X_T_X_inv = inverter2x2(X_T_X);
    const X_T_Y = multiplicarMatrizes(X_T, Y);
    const beta = multiplicarMatrizes(X_T_X_inv, X_T_Y);

    const a = beta[0][0];
    const b = beta[1][0];
    const c = 21.5;

    return {
      X_T,
      X_T_X,
      X_T_X_inv,
      X_T_Y,
      beta,
      a: a.toFixed(6),
      b: b.toFixed(6),
      c: c.toFixed(1),
      formula: `f₃(t) = ${a.toFixed(6)}t² + ${b.toFixed(6)}t + ${c.toFixed(1)}`
    };
  };

  // EXERCÍCIO 4 e 5
  const exercicio4e5 = () => {
    const X_tilde = [
      [0, 0, 1],
      [9, 3, 1],
      [36, 6, 1],
      [81, 9, 1],
      [144, 12, 1],
      [225, 15, 1]
    ];

    const Y_tilde = [[21.5], [19.8], [20.0], [22.2], [24.8], [25.8]];

    const X_T = transpor(X_tilde);
    const X_T_X = multiplicarMatrizes(X_T, X_tilde);
    const X_T_X_inv = inverter3x3(X_T_X);
    const X_T_Y = multiplicarMatrizes(X_T, Y_tilde);
    const beta = multiplicarMatrizes(X_T_X_inv, X_T_Y);

    const a = beta[0][0];
    const b = beta[1][0];
    const c = beta[2][0];

    return {
      X_T,
      X_T_X,
      X_T_X_inv,
      X_T_Y,
      beta,
      a: a.toFixed(6),
      b: b.toFixed(6),
      c: c.toFixed(6),
      formula: `f₄(t) = ${a.toFixed(6)}t² + ${b.toFixed(6)}t + ${c.toFixed(6)}`
    };
  };

  // EXERCÍCIO 6: Comparação
  const exercicio6 = () => {
    const ex1 = exercicio1();
    const ex3 = exercicio2e3();
    const ex5 = exercicio4e5();

    // Definir as funções
    const f1 = (t) => Math.pow(t - 3, 2) + 19.8;
    const f2 = (t) => 0.0410468 * Math.pow(t - 3, 2) + 19.8;
    const f3 = (t) => parseFloat(ex3.a) * t * t + parseFloat(ex3.b) * t + parseFloat(ex3.c);
    const f4 = (t) => parseFloat(ex5.a) * t * t + parseFloat(ex5.b) * t + parseFloat(ex5.c);

    const funcoes = [
      { nome: 'f₁(t)', func: f1 },
      { nome: 'f₂(t)', func: f2 },
      { nome: 'f₃(t)', func: f3 },
      { nome: 'f₄(t)', func: f4 }
    ];

    const resultados = funcoes.map(({ nome, func }) => {
      let erroTotalAbs = 0;
      let erroTotalRel = 0;

      const pontosCalculados = dados.map(({ t, N }) => {
        const ft = func(t);
        const erroAbs = Math.abs(N - ft);
        const erroRel = (erroAbs / N) * 100;

        erroTotalAbs += erroAbs;
        erroTotalRel += erroRel;

        return {
          t,
          N,
          ft: ft.toFixed(4),
          erroAbs: erroAbs.toFixed(4),
          erroRel: erroRel.toFixed(2)
        };
      });

      return {
        nome,
        pontos: pontosCalculados,
        erroTotalAbs: erroTotalAbs.toFixed(4),
        erroTotalRel: erroTotalRel.toFixed(2)
      };
    });

    const melhorAbs = resultados.reduce((min, r) => 
      parseFloat(r.erroTotalAbs) < parseFloat(min.erroTotalAbs) ? r : min
    );

    return { resultados, melhorAbs: melhorAbs.nome };
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const formatarMatriz = (matriz) => {
    return matriz.map(linha => 
      `[${linha.map(val => typeof val === 'number' ? val.toFixed(4) : val).join(', ')}]`
    ).join('\n');
  };

  const ex1Result = exercicio1();
  const ex3Result = exercicio2e3();
  const ex5Result = exercicio4e5();
  const ex6Result = exercicio6();

  // Preparar dados para os gráficos
  const prepararDadosGraficos = () => {
    const ex1 = exercicio1();
    const ex3 = exercicio2e3();
    const ex5 = exercicio4e5();

    const f1 = (t) => Math.pow(t - 3, 2) + 19.8;
    const f2 = (t) => 0.0410468 * Math.pow(t - 3, 2) + 19.8;
    const f3 = (t) => parseFloat(ex3.a) * t * t + parseFloat(ex3.b) * t + parseFloat(ex3.c);
    const f4 = (t) => parseFloat(ex5.a) * t * t + parseFloat(ex5.b) * t + parseFloat(ex5.c);

    // Gerar pontos para curvas suaves
    const pontosGrafico = [];
    for (let t = 0; t <= 15; t += 0.5) {
      pontosGrafico.push({
        t: t,
        f1: f1(t),
        f2: f2(t),
        f3: f3(t),
        f4: f4(t)
      });
    }

    // Pontos observados
    const pontosObservados = dados.map(({ t, N }) => ({ t, N }));

    return { pontosGrafico, pontosObservados };
  };

  // Preparar dados para gráfico de erros
  const prepararDadosErros = () => {
    return ex6Result.resultados.map(resultado => ({
      nome: resultado.nome,
      erroAbs: parseFloat(resultado.erroTotalAbs),
      erroRel: parseFloat(resultado.erroTotalRel)
    }));
  };

  const { pontosGrafico, pontosObservados } = prepararDadosGraficos();
  const dadosErros = prepararDadosErros();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">
              Trabalho de Cálculo 1 - Aproximações Parabólicas
            </h1>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-lg mb-2">Dados Observados:</h3>
            <div className="grid grid-cols-6 gap-4 text-center">
              {dados.map(({ t, N }) => (
                <div key={t} className="bg-white p-2 rounded">
                  <div className="text-sm text-gray-600">t = {t}</div>
                  <div className="font-semibold">N = {N}</div>
                </div>
              ))}
            </div>
          </div>

          {/* EXERCÍCIO 1 */}
          <div className="mb-6 border border-gray-200 rounded-lg">
            <button
              onClick={() => toggleSection('ex1')}
              className="w-full p-4 bg-indigo-50 hover:bg-indigo-100 flex justify-between items-center rounded-t-lg"
            >
              <h2 className="text-xl font-bold text-indigo-700">EXERCÍCIO 1: Explicitar f₂(x)</h2>
              {expandedSections.ex1 ? <ChevronUp /> : <ChevronDown />}
            </button>
            {expandedSections.ex1 && (
              <div className="p-4 bg-white">
                <div className="space-y-3">
                  <p><strong>1/c =</strong> {ex1Result.c_inv}</p>
                  <p><strong>c ≈</strong> {ex1Result.c}</p>
                  <div className="bg-green-50 p-4 rounded-lg border-2 border-green-500">
                    <p className="text-lg font-bold text-green-800">
                      {ex1Result.formulaSimplificada}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* EXERCÍCIO 2 e 3 */}
          <div className="mb-6 border border-gray-200 rounded-lg">
            <button
              onClick={() => toggleSection('ex2')}
              className="w-full p-4 bg-indigo-50 hover:bg-indigo-100 flex justify-between items-center"
            >
              <h2 className="text-xl font-bold text-indigo-700">EXERCÍCIOS 2 e 3: Cálculos Matriciais e f₃(x)</h2>
              {expandedSections.ex2 ? <ChevronUp /> : <ChevronDown />}
            </button>
            {expandedSections.ex2 && (
              <div className="p-4 bg-white space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">X⊤ (Transposta de X):</h3>
                  <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
                    {formatarMatriz(ex3Result.X_T)}
                  </pre>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">X⊤X:</h3>
                  <pre className="bg-gray-50 p-3 rounded text-sm">
                    {formatarMatriz(ex3Result.X_T_X)}
                  </pre>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">(X⊤X)⁻¹:</h3>
                  <pre className="bg-gray-50 p-3 rounded text-sm">
                    {formatarMatriz(ex3Result.X_T_X_inv)}
                  </pre>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">X⊤Y:</h3>
                  <pre className="bg-gray-50 p-3 rounded text-sm">
                    {formatarMatriz(ex3Result.X_T_Y)}
                  </pre>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">β = (X⊤X)⁻¹X⊤Y:</h3>
                  <pre className="bg-gray-50 p-3 rounded text-sm">
                    a = {ex3Result.a}
                    b = {ex3Result.b}
                  </pre>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border-2 border-green-500">
                  <p className="text-lg font-bold text-green-800">
                    {ex3Result.formula}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* EXERCÍCIO 4 e 5 */}
          <div className="mb-6 border border-gray-200 rounded-lg">
            <button
              onClick={() => toggleSection('ex4')}
              className="w-full p-4 bg-indigo-50 hover:bg-indigo-100 flex justify-between items-center"
            >
              <h2 className="text-xl font-bold text-indigo-700">EXERCÍCIOS 4 e 5: Cálculos Matriciais e f₄(x)</h2>
              {expandedSections.ex4 ? <ChevronUp /> : <ChevronDown />}
            </button>
            {expandedSections.ex4 && (
              <div className="p-4 bg-white space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">X̃⊤ (Transposta de X̃):</h3>
                  <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
                    {formatarMatriz(ex5Result.X_T)}
                  </pre>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">X̃⊤X̃:</h3>
                  <pre className="bg-gray-50 p-3 rounded text-sm">
                    {formatarMatriz(ex5Result.X_T_X)}
                  </pre>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">(X̃⊤X̃)⁻¹:</h3>
                  <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
                    {formatarMatriz(ex5Result.X_T_X_inv)}
                  </pre>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">X̃⊤Ỹ:</h3>
                  <pre className="bg-gray-50 p-3 rounded text-sm">
                    {formatarMatriz(ex5Result.X_T_Y)}
                  </pre>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">β̃ = (X̃⊤X̃)⁻¹X̃⊤Ỹ:</h3>
                  <pre className="bg-gray-50 p-3 rounded text-sm">
                    a = {ex5Result.a}
                    b = {ex5Result.b}
                    c = {ex5Result.c}
                  </pre>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border-2 border-green-500">
                  <p className="text-lg font-bold text-green-800">
                    {ex5Result.formula}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* EXERCÍCIO 6 */}
          <div className="mb-6 border border-gray-200 rounded-lg">
            <button
              onClick={() => toggleSection('ex6')}
              className="w-full p-4 bg-indigo-50 hover:bg-indigo-100 flex justify-between items-center rounded-t-lg"
            >
              <h2 className="text-xl font-bold text-indigo-700">EXERCÍCIO 6: Comparação das Aproximações</h2>
              {expandedSections.ex6 ? <ChevronUp /> : <ChevronDown />}
            </button>
            {expandedSections.ex6 && (
              <div className="p-4 bg-white">
                {ex6Result.resultados.map((resultado, idx) => (
                  <div key={idx} className="mb-6">
                    <h3 className="text-lg font-bold mb-3 text-indigo-600">{resultado.nome}</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="border border-gray-300 p-2">t</th>
                            <th className="border border-gray-300 p-2">N(t)</th>
                            <th className="border border-gray-300 p-2">f(t)</th>
                            <th className="border border-gray-300 p-2">Erro Abs</th>
                            <th className="border border-gray-300 p-2">Erro Rel (%)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {resultado.pontos.map((ponto, i) => (
                            <tr key={i} className="hover:bg-gray-50">
                              <td className="border border-gray-300 p-2 text-center">{ponto.t}</td>
                              <td className="border border-gray-300 p-2 text-center">{ponto.N}</td>
                              <td className="border border-gray-300 p-2 text-center">{ponto.ft}</td>
                              <td className="border border-gray-300 p-2 text-center">{ponto.erroAbs}</td>
                              <td className="border border-gray-300 p-2 text-center">{ponto.erroRel}%</td>
                            </tr>
                          ))}
                          <tr className="bg-yellow-50 font-bold">
                            <td colSpan="3" className="border border-gray-300 p-2">TOTAIS:</td>
                            <td className="border border-gray-300 p-2 text-center">{resultado.erroTotalAbs}</td>
                            <td className="border border-gray-300 p-2 text-center">{resultado.erroTotalRel}%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
                <div className="bg-green-50 p-4 rounded-lg border-2 border-green-500 mt-6">
                  <p className="text-lg font-bold text-green-800">
                    🏆 MELHOR APROXIMAÇÃO: {ex6Result.melhorAbs}
                  </p>
                  <p className="text-sm text-gray-700 mt-2">
                    Esta função apresenta o menor erro total absoluto entre todas as aproximações testadas.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* GRÁFICOS */}
          <div className="mb-6 border border-gray-200 rounded-lg">
            <button
              onClick={() => toggleSection('graficos')}
              className="w-full p-4 bg-purple-50 hover:bg-purple-100 flex justify-between items-center rounded-t-lg"
            >
              <div className="flex items-center gap-2">
                <LineChart className="w-6 h-6 text-purple-700" />
                <h2 className="text-xl font-bold text-purple-700">GRÁFICOS: Visualização das Aproximações</h2>
              </div>
              {expandedSections.graficos ? <ChevronUp /> : <ChevronDown />}
            </button>
            {expandedSections.graficos && (
              <div className="p-6 bg-white space-y-8">
                {/* Gráfico 1: Todas as funções */}
                <div>
                  <h3 className="text-lg font-bold mb-4 text-purple-700">
                    Comparação de Todas as Aproximações
                  </h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <RechartsLineChart data={pontosGrafico}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="t" 
                        label={{ value: 'Tempo (t)', position: 'insideBottom', offset: -5 }}
                      />
                      <YAxis 
                        label={{ value: 'N(t)', angle: -90, position: 'insideLeft' }}
                      />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="f1" 
                        stroke="#ef4444" 
                        name="f₁(t)" 
                        dot={false}
                        strokeWidth={2}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="f2" 
                        stroke="#f59e0b" 
                        name="f₂(t)" 
                        dot={false}
                        strokeWidth={2}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="f3" 
                        stroke="#3b82f6" 
                        name="f₃(t)" 
                        dot={false}
                        strokeWidth={2}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="f4" 
                        stroke="#10b981" 
                        name="f₄(t)" 
                        dot={false}
                        strokeWidth={2}
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>

                {/* Gráfico 2: Pontos observados + melhor aproximação */}
                <div>
                  <h3 className="text-lg font-bold mb-4 text-purple-700">
                    Dados Observados vs Melhor Aproximação (f₄)
                  </h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <RechartsLineChart>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="t" 
                        type="number"
                        domain={[0, 15]}
                        label={{ value: 'Tempo (t)', position: 'insideBottom', offset: -5 }}
                      />
                      <YAxis 
                        domain={[18, 28]}
                        label={{ value: 'N(t)', angle: -90, position: 'insideLeft' }}
                      />
                      <Tooltip />
                      <Legend />
                      <Line 
                        data={pontosGrafico}
                        type="monotone" 
                        dataKey="f4" 
                        stroke="#10b981" 
                        name="f₄(t) - Aproximação" 
                        dot={false}
                        strokeWidth={3}
                      />
                      <Scatter 
                        data={pontosObservados}
                        dataKey="N"
                        fill="#8b5cf6" 
                        name="Dados Observados"
                        shape="circle"
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>

                {/* Gráfico 3: Comparação de erros */}
                <div>
                  <h3 className="text-lg font-bold mb-4 text-purple-700">
                    Comparação de Erros Totais
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Erro Absoluto */}
                    <div>
                      <h4 className="text-md font-semibold mb-2 text-center">Erro Absoluto Total</h4>
                      <ResponsiveContainer width="100%" height={300}>
                        <RechartsLineChart data={dadosErros}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="nome" />
                          <YAxis />
                          <Tooltip />
                          <Line 
                            type="monotone" 
                            dataKey="erroAbs" 
                            stroke="#dc2626" 
                            strokeWidth={3}
                            dot={{ fill: '#dc2626', r: 6 }}
                          />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Erro Relativo */}
                    <div>
                      <h4 className="text-md font-semibold mb-2 text-center">Erro Relativo Total (%)</h4>
                      <ResponsiveContainer width="100%" height={300}>
                        <RechartsLineChart data={dadosErros}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="nome" />
                          <YAxis />
                          <Tooltip />
                          <Line 
                            type="monotone" 
                            dataKey="erroRel" 
                            stroke="#ea580c" 
                            strokeWidth={3}
                            dot={{ fill: '#ea580c', r: 6 }}
                          />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Análise dos gráficos */}
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-bold text-lg mb-2">📊 Análise dos Gráficos:</h4>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Gráfico 1:</strong> Mostra como cada aproximação se comporta. Note que f₁(t) (vermelho) cresce muito rapidamente, pois não tem o fator de escala correto.</li>
                    <li><strong>Gráfico 2:</strong> Compara os dados observados (pontos roxos) com a melhor aproximação f₄(t) (linha verde). Observe como a curva passa próxima a todos os pontos.</li>
                    <li><strong>Gráfico 3:</strong> Mostra claramente que f₄(t) possui os menores erros (tanto absoluto quanto relativo), confirmando que é a melhor aproximação.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrabalhoCalculo;
