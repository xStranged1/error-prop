import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Plus, Calculator } from "lucide-react"

interface Term {
  id: string
  value: number
  error: number
  unit: string
  operation: "+" | "-"
}

export default function App() {
  const [terms, setTerms] = useState<Term[]>([{ id: "1", value: 3.2, error: 0.5, unit: "cm", operation: "+" }])
  const [newValue, setNewValue] = useState("")
  const [newError, setNewError] = useState("")
  const [newUnit, setNewUnit] = useState("cm")
  const [newOperation, setNewOperation] = useState<"+" | "-">("+")

  const addTerm = () => {
    if (newValue && newError) {
      const newTerm: Term = {
        id: Date.now().toString(),
        value: Number.parseFloat(newValue),
        error: Number.parseFloat(newError),
        unit: newUnit,
        operation: newOperation,
      }
      setTerms([...terms, newTerm])
      setNewValue("")
      setNewError("")
    }
  }

  const removeTerm = (id: string) => {
    setTerms(terms.filter((term) => term.id !== id))
  }

  const updateTermOperation = (id: string, operation: "+" | "-") => {
    setTerms(terms.map((term) => (term.id === id ? { ...term, operation } : term)))
  }

  const calculateResult = () => {
    if (terms.length === 0) return { value: 0, error: 0, unit: "" }

    // Calcular el valor resultante
    let result = terms[0].value
    for (let i = 1; i < terms.length; i++) {
      if (terms[i].operation === "+") {
        result += terms[i].value
      } else {
        result -= terms[i].value
      }
    }

    const totalError = terms.reduce((sum, term) => sum + term.error, 0)

    return {
      value: result,
      error: totalError,
      unit: terms[0].unit,
    }
  }

  const result = calculateResult()

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Simulador de Propagación de Errores</h1>
          <p className="text-muted-foreground">Suma y resta con propagación de errores</p>
        </div>

        {/* Agregar nuevo término */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Agregar Término
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div>
                <label className="text-sm font-medium">Valor</label>
                <Input
                  type="number"
                  step="any"
                  placeholder="3.2"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Error (±)</label>
                <Input
                  type="number"
                  step="any"
                  placeholder="0.2"
                  value={newError}
                  onChange={(e) => setNewError(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Unidad</label>
                <Input placeholder="cm" value={newUnit} onChange={(e) => setNewUnit(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium">Operación</label>
                <Select value={newOperation} onValueChange={(value: "+" | "-") => setNewOperation(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+">+ (Suma)</SelectItem>
                    <SelectItem value="-">- (Resta)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button onClick={addTerm} className="w-full">
                  Agregar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Términos de la Operación</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-2">
              {terms.map((term, index) => (
                <div key={term.id} className="flex items-center gap-2">
                  {index > 0 && (
                    <Select
                      value={term.operation}
                      onValueChange={(value: "+" | "-") => updateTermOperation(term.id, value)}
                    >
                      <SelectTrigger className="w-12 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="+">+</SelectItem>
                        <SelectItem value="-">-</SelectItem>
                      </SelectContent>
                    </Select>
                  )}

                  <div className="flex items-center gap-1 bg-muted px-3 py-2 rounded-lg">
                    <span className="font-mono text-sm">
                      [{term.value} {term.unit} ± {term.error} {term.unit}]
                    </span>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTerm(term.id)}
                      disabled={terms.length === 1}
                      className="h-6 w-6 p-0 ml-2 hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Resultado */}
        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Resultado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="text-2xl font-mono font-bold">
                [{result.value.toFixed(1)} {result.unit} ± {result.error.toFixed(1)} {result.unit}]
              </div>

              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  <strong>Valor:</strong> {result.value.toFixed(3)} {result.unit}
                </p>
                <p>
                  <strong>Error absoluto:</strong> ±{result.error.toFixed(3)} {result.unit}
                </p>
                <p>
                  <strong>Error relativo:</strong> ±
                  {result.value !== 0 ? ((result.error / Math.abs(result.value)) * 100).toFixed(2) : "0"}%
                </p>
              </div>

              <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
                <p>
                  <strong>Fórmula de propagación:</strong>
                </p>
                <p>Para suma y resta: δR = δA + δB + δC + ...</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-blue-700 dark:text-blue-300">Ejemplo</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-blue-600 dark:text-blue-400">
            <p>
              <strong>Operación:</strong> [3.2 cm ± 0.5 cm] + [120 cm ± 2 cm]
            </p>
            <p>
              <strong>Resultado:</strong> [123.2 cm ± 2.5 cm]
            </p>
            <p className="mt-2">El error se calcula como: 0.5 + 2 = 2.5</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
