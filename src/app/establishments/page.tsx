"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useCallback, useContext, useEffect } from "react"
import { Search } from "lucide-react"
import { Card } from "@/components/ui/card"
import { EstablishmentsContext } from "@/context/establishments-context"
import { RowActionsDropdown } from "@/components/molecules/establishments/row-actions-dropdown"
import ViewEstablishmentModal from "@/components/molecules/establishments/view-establishment-modal"
import UpdateEstablishmentModal from "@/components/molecules/establishments/update-establishment-modal"
import DeleteEstablishmentModal from "@/components/molecules/establishments/delete-establishment-modal"
import { getEstablishments } from "@/_core/infra/actions/establishments/get-establishments"
import { toast } from "sonner"

export default function EstablishmentsPage() {
  const {
    isLoading,
    establishments,
    setEstablishments,
    showCreateEstablishmentModal,
    setShowCreateEstablishmentModal,
    showUpdateEstablishmentModal,
    showDeleteEstablishmentModal,
    showViewEstablishmentModal,
    setSubmitFetchEstablishments,
    submitFetchEstablishments
  } = useContext(EstablishmentsContext)

  const handleSubmit = useCallback(() => {
    // const formValues = form.getValues()
    // console.log('formValues:: ', formValues)
    getEstablishments().then((establishments) => {
      toast('Lista de estabelecimentos atualizada com sucesso!')
      setEstablishments(establishments)
      setSubmitFetchEstablishments(false)
    }).catch((error) => {
      console.log('error:: ', error)
      toast(error.message || "Erro ao buscar estabelecimentos")
    })
  }, []);

  useEffect(() => {
    if(submitFetchEstablishments) {
      console.log('submitFetchEstablishments:: ', submitFetchEstablishments)
      handleSubmit()
    }
  }, [submitFetchEstablishments])

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div />
        {/* <ListEstablishmentsForm onSubmit={handleSubmit} /> */}
        <button
          
          disabled={isLoading}
          onClick={handleSubmit}
        >
          <Search />
        </button>
      </div>
      <Card>
        <Table>
          <TableCaption>Lista de estabelecimentos</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="" />
              <TableHead>Nome</TableHead>
              <TableHead>CNPJ</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Endereço</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Vagas para motos</TableHead>
              <TableHead>Vagas para carros</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {establishments && Array.isArray(establishments) && establishments?.map((item, i) => (
              <TableRow key={item.id || i}>
                <TableHead><RowActionsDropdown establishment={item} /></TableHead>
                <TableHead className="font-medium">{item?.name || '-'}</TableHead>
                <TableHead>{item?.cnpj || '-'}</TableHead>
                <TableHead>{item?.email || '-'}</TableHead>
                <TableHead>{item?.address || '-'}</TableHead>
                <TableHead>{item?.phone || '-'}</TableHead>
                <TableHead>{item?.motorcycleSlots || '-'}</TableHead>
                <TableHead>{item?.carSlots || '-'}</TableHead>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      {showViewEstablishmentModal && <ViewEstablishmentModal />}
      {showUpdateEstablishmentModal && <UpdateEstablishmentModal />}
      {showDeleteEstablishmentModal && <DeleteEstablishmentModal />}
    </div>
  )
}
