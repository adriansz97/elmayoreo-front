import { Header } from "../../components"
import { Graphic } from "../../components/Graphic"

export const DashboardPage = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4">

      {/* Header */}
      <div className="items-start justify-between md:flex">
        <Header>Dashboard</Header>
      </div>

      {/* Tabla */}
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto w-96">
        <Graphic />
      </div>

    </div>
  )
}

