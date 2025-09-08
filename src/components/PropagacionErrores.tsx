import { Card, CardContent } from "@/components/ui/card";

export default function PropagacionErrores() {
  return (
    <div className="flex flex-col items-center gap-6 p-6 max-w-2xl mx-auto">
      {/* Filmina 1: Introducción */}
      <h1 className="text-2xl font-bold mb-2 mt-4">
        Propagación de los errores en las operaciones básicas
      </h1>

      <p className="text-gray-700">
        Cuando trabajamos con mediciones, cada dato tiene un error asociado.
        Al operar con ellos, estos errores también se combinan y afectan el
        resultado final.
        <br />
        La pregunta es: <span className="font-semibold">¿Cómo se
          combinan los errores en una suma o resta?</span>
      </p>

      {/* Filmina 2: Caso suma y diferencia */}
      <Card className="shadow-lg rounded-2xl">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-3">Suma y diferencia</h2>
          <p className="text-gray-700">
            Consideremos una función de dos variables:
          </p>
          <p className="text-center font-mono my-3">f(x₁, x₂) = x₁ ± x₂</p>
          <p className="text-gray-700">
            Es decir, el resultado puede ser la <b>suma</b> de dos magnitudes
            (ejemplo: medir el largo total de dos barras) o la <b>diferencia</b>
            (ejemplo: calcular la altura de un objeto restando dos medidas).
          </p>
          <p className="text-gray-700 mt-3">
            Para analizar cómo se transmiten los errores, calculamos las{" "}
            <b>derivadas parciales</b> de la función respecto de cada variable:
          </p>
          <p className="text-center font-mono my-3">
            ∂f/∂x₁ = ±1 &nbsp;&nbsp;&nbsp; y &nbsp;&nbsp;&nbsp; ∂f/∂x₂ = ±1
          </p>
          <p className="text-gray-700">
            En valor absoluto, ambas derivadas son iguales a 1. Esto significa
            que <b>cada error en x₁ y en x₂ se transmite directamente al
              resultado</b>, sin amplificarse ni atenuarse.
          </p>
        </CardContent>
      </Card>

      {/* Filmina 2b: Nota sobre derivadas parciales */}
      <Card className="shadow-lg rounded-2xl bg-gray-50">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-2">Nota: ¿Por qué derivadas parciales?</h3>
          <p className="text-gray-700">
            La idea es que un pequeño cambio en las variables <i>x₁</i> o <i>x₂</i>
            (que representa su error) provoca un cambio en el resultado <i>f</i>.
          </p>
          <p className="text-gray-700 mt-2">
            Las <b>derivadas parciales</b> nos indican con qué intensidad
            el resultado <i>f</i> cambia cuando varía cada variable por separado.
            En otras palabras: <u>cuánto se amplifica o reduce el error de cada variable en el resultado</u>.
          </p>
        </CardContent>
      </Card>

      {/* Filmina 3: Fórmula general del error */}
      <Card className="shadow-lg rounded-2xl">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-3">Cálculo del error total</h2>
          <p className="text-gray-700">
            Usando las derivadas parciales, podemos escribir la fórmula para la
            <b> cota del error absoluto</b> en el resultado:
          </p>
          <p className="text-center font-mono my-3">
            Δf = |∂f/∂x₁| · Δx₁ + |∂f/∂x₂| · Δx₂
          </p>
          <p className="text-gray-700">
            Como vimos, cada derivada vale 1. Entonces:
          </p>
          <p className="text-center font-mono my-3">
            Δf = Δx₁ + Δx₂
          </p>
          <p className="text-gray-700">
            Esto significa que el error absoluto del resultado es, como máximo,{" "}
            <b>la suma de los errores absolutos de cada variable</b>.
            En otras palabras, <u>los errores se acumulan</u> en la suma y en la
            diferencia.
          </p>
        </CardContent>
      </Card>

      {/* Filmina 4: Conclusión */}
      <Card className="shadow-lg rounded-2xl bg-blue-50">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-3">Conclusión</h2>
          <p className="text-gray-800 font-medium">
            En suma y diferencia, el error absoluto del resultado es la suma de
            los errores absolutos de las magnitudes involucradas.
            <br />

          </p>
        </CardContent>
      </Card>
    </div>
  );
}