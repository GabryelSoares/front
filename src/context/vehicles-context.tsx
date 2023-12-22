"use client"
import React, { createContext, FC, ReactNode, useCallback, useState } from 'react';
import { Vehicle } from '@/models/vehicle';
import { api } from '@/lib/api';
import { listVehiclesSchema } from '@/app/schemas/vehicle/list-vehicles-schema';
import { z } from 'zod';
import { toast } from '@/components/ui/use-toast';
import { createVehicleSchema } from '@/app/schemas/vehicle/create-vehicle-schema';
import { updateVehicleSchema } from '@/app/schemas/vehicle/update-vehicle-schema';

export type VehiclesContextValue = {
  isLoading: boolean;
  vehicles: Vehicle[];
  selectedVehicles: Vehicle[];
  setSelectedVehicles: (vehicles: Vehicle[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  createVehicle: (formValues: z.infer<typeof createVehicleSchema>) => void;
  deleteVehicle: (id: number) => void;
  updateVehicle: (formValues: z.infer<typeof updateVehicleSchema>) => void;
  fetchVehicles: (formValues?: z.infer<typeof listVehiclesSchema>) => void;
  showCreateVehicleModal: boolean;
  setShowCreateVehicleModal: (showCreateVehicleModal: boolean) => void;
  showUpdateVehicleModal: boolean;
  setShowUpdateVehicleModal: (showUpdateVehicleModal: boolean) => void;
  showDeleteVehicleModal: boolean;
  setShowDeleteVehicleModal: (showDeleteVehicleModal: boolean) => void;
  showViewVehicleModal: boolean;
  setShowViewVehicleModal: (showViewVehicleModal: boolean) => void;
  submitFetchVehicles: boolean;
};

export const VehiclesContext: React.Context<VehiclesContextValue> = createContext<VehiclesContextValue>({
  isLoading: false,
  vehicles: [],
  selectedVehicles: [],
  setSelectedVehicles: () => { },
  setIsLoading: () => { },
  createVehicle: () => { },
  deleteVehicle: () => { },
  updateVehicle: () => { },
  fetchVehicles: () => { },
  showCreateVehicleModal: false,
  setShowCreateVehicleModal: () => { },
  showUpdateVehicleModal: false,
  setShowUpdateVehicleModal: () => { },
  showDeleteVehicleModal: false,
  setShowDeleteVehicleModal: () => { },
  showViewVehicleModal: false,
  setShowViewVehicleModal: () => { },
  submitFetchVehicles: false,
});

export type Props = {
  children: ReactNode;
};

export const VehiclesProvider: FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicles, setSelectedVehicles] = useState<Vehicle[]>([]);
  const [showCreateVehicleModal, setShowCreateVehicleModal] = useState<boolean>(false);
  const [showUpdateVehicleModal, setShowUpdateVehicleModal] = useState<boolean>(false);
  const [showDeleteVehicleModal, setShowDeleteVehicleModal] = useState<boolean>(false);
  const [showViewVehicleModal, setShowViewVehicleModal] = useState<boolean>(false);
  const [submitFetchVehicles, setSubmitFetchVehicles] = useState<boolean>(false);

  const createVehicle = useCallback(async (formValues: z.infer<typeof createVehicleSchema>) => {
    try {
      setIsLoading(true)
      const response = await api<Vehicle>('/vehicles', {
        method: 'POST',
        body: JSON.stringify({...formValues, type: Number(formValues.type)})
      })
      if (response.data) {
        console.log('response.data:: ', response.data)
        setVehicles(prevState => prevState ? [...prevState, response.data] : [response.data])
        toast({
          title: "Veículo cadastrado com sucesso",
        })
        setSubmitFetchVehicles(true)
        setShowCreateVehicleModal(false)
        return;
      }
      throw new Error('Erro ao cadastrar veículo')
    } catch(error) {
      toast({
        title: "Erro ao cadastrar veículo",
      })
    } finally {
      setIsLoading(false)
    }
  },[setSubmitFetchVehicles])

  const fetchVehicles = useCallback(async (formValues?: z.infer<typeof listVehiclesSchema>) => {
    setSubmitFetchVehicles(false)
    setIsLoading(true)
    try {
      const response = await api<Vehicle[]>('/vehicles')
      setVehicles(response.data)
    } catch(error) {
      toast({
        title: "Erro ao buscar veículos",
      })
    } finally {
      setIsLoading(false)
    }
  },[setSubmitFetchVehicles])

  const updateVehicle = useCallback(async (formValues: z.infer<typeof updateVehicleSchema>) => {
    try {
      setIsLoading(true)
      const response = await api<Vehicle>(`/vehicles/${selectedVehicles[0].id}`, {
        method: 'PATCH',
        body: JSON.stringify({...formValues, type: Number(formValues.type)})
      })
      if (response.data) {
        console.log('response.data:: ', response.data)
        setVehicles(prevState => prevState.map(vehicle => vehicle.id === response.data.id ? response.data : vehicle))
        toast({
          title: "Veículo editado com sucesso",
        })
        setSubmitFetchVehicles(true)
        setShowUpdateVehicleModal(false)
        return;
      }
      throw new Error('Erro ao editar veículo')
    } catch(error) {
      console.log('error:: ', error)
      toast({
        title: "Erro ao editar veículo",
      })
    } finally {
      setIsLoading(false)
    }
  },[selectedVehicles, setSubmitFetchVehicles])

  const deleteVehicle = useCallback(async () => {
    try {
      setIsLoading(true)
      if(!selectedVehicles[0]?.id) throw new Error('Nenhum veículo selecionado')
      const response = await api<Vehicle>(`/vehicles/${selectedVehicles[0]?.id}`, {
        method: 'DELETE'
      })
      if(!response.data) throw new Error('Erro ao apagar veículo')
      console.log('deleteVehicle > response:: ', response)
      setSubmitFetchVehicles(true)
      setShowDeleteVehicleModal(false)
      toast({
        title: "Veículo apagado com sucesso",
      })
    } catch(error) {
      toast({
        title: "Erro ao apagar veículo",
      })
    } finally {
      setIsLoading(false)
    }
  },[selectedVehicles, setSubmitFetchVehicles])
  
  return (
    <VehiclesContext.Provider value={{
      isLoading,
      vehicles,
      selectedVehicles,
      setSelectedVehicles,
      setIsLoading,
      createVehicle,
      deleteVehicle,
      fetchVehicles,
      updateVehicle,
      showCreateVehicleModal,
      setShowCreateVehicleModal,
      showUpdateVehicleModal,
      setShowUpdateVehicleModal,
      showDeleteVehicleModal,
      setShowDeleteVehicleModal,
      showViewVehicleModal,
      setShowViewVehicleModal,
      submitFetchVehicles,
    }}>
      {children}
    </VehiclesContext.Provider>
  );
};

