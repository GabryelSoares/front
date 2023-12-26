"use client"
import React, { createContext, FC, ReactNode, useState } from 'react';
import { Vehicle } from '@/_core/domain/models/vehicle';

export type VehiclesContextValue = {
  isLoading: boolean;
  vehicles: Vehicle[];
  setVehicles: (vehicles: Vehicle[]) => void;
  selectedVehicles: Vehicle[];
  setSelectedVehicles: (vehicles: Vehicle[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  showCreateVehicleModal: boolean;
  setShowCreateVehicleModal: (showCreateVehicleModal: boolean) => void;
  showUpdateVehicleModal: boolean;
  setShowUpdateVehicleModal: (showUpdateVehicleModal: boolean) => void;
  showDeleteVehicleModal: boolean;
  setShowDeleteVehicleModal: (showDeleteVehicleModal: boolean) => void;
  showViewVehicleModal: boolean;
  setShowViewVehicleModal: (showViewVehicleModal: boolean) => void;
  submitFetchVehicles: boolean;
  setSubmitFetchVehicles: (submitFetchVehicles: boolean) => void;
};

export const VehiclesContext: React.Context<VehiclesContextValue> = createContext<VehiclesContextValue>({
  isLoading: false,
  vehicles: [],
  setVehicles: () => { },
  selectedVehicles: [],
  setSelectedVehicles: () => { },
  setIsLoading: () => { },
  showCreateVehicleModal: false,
  setShowCreateVehicleModal: () => { },
  showUpdateVehicleModal: false,
  setShowUpdateVehicleModal: () => { },
  showDeleteVehicleModal: false,
  setShowDeleteVehicleModal: () => { },
  showViewVehicleModal: false,
  setShowViewVehicleModal: () => { },
  submitFetchVehicles: false,
  setSubmitFetchVehicles: () => { },
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
  
  return (
    <VehiclesContext.Provider value={{
      isLoading,
      vehicles,
      setVehicles,
      selectedVehicles,
      setSelectedVehicles,
      setIsLoading,
      showCreateVehicleModal,
      setShowCreateVehicleModal,
      showUpdateVehicleModal,
      setShowUpdateVehicleModal,
      showDeleteVehicleModal,
      setShowDeleteVehicleModal,
      showViewVehicleModal,
      setShowViewVehicleModal,
      submitFetchVehicles,
      setSubmitFetchVehicles
    }}>
      {children}
    </VehiclesContext.Provider>
  );
};

