"use client"
import React, { createContext, FC, ReactNode, useState } from 'react';
import { ParkingRegister } from '@/_core/domain/models/parking-register';

export type ParkingRegistersContextValue = {
  isLoading: boolean;
  parkingRegisters: ParkingRegister[];
  setParkingRegisters: (parkingRegisters: ParkingRegister[]) => void;
  selectedParkingRegisters: ParkingRegister[];
  setSelectedParkingRegisters: (parkingRegisters: ParkingRegister[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  showCreateParkingRegisterModal: boolean;
  setShowCreateParkingRegisterModal: (showCreateParkingRegisterModal: boolean) => void;
  showUpdateParkingRegisterModal: boolean;
  setShowUpdateParkingRegisterModal: (showUpdateParkingRegisterModal: boolean) => void;
  showDeleteParkingRegisterModal: boolean;
  setShowDeleteParkingRegisterModal: (showDeleteParkingRegisterModal: boolean) => void;
  showViewParkingRegisterModal: boolean;
  setShowViewParkingRegisterModal: (showViewParkingRegisterModal: boolean) => void;
  submitFetchParkingRegisters: boolean;
  setSubmitFetchParkingRegisters: (submitFetchParkingRegisters: boolean) => void;
};

export const ParkingRegistersContext: React.Context<ParkingRegistersContextValue> = createContext<ParkingRegistersContextValue>({
  isLoading: false,
  parkingRegisters: [],
  setParkingRegisters: () => { },
  selectedParkingRegisters: [],
  setSelectedParkingRegisters: () => { },
  setIsLoading: () => { },
  showCreateParkingRegisterModal: false,
  setShowCreateParkingRegisterModal: () => { },
  showUpdateParkingRegisterModal: false,
  setShowUpdateParkingRegisterModal: () => { },
  showDeleteParkingRegisterModal: false,
  setShowDeleteParkingRegisterModal: () => { },
  showViewParkingRegisterModal: false,
  setShowViewParkingRegisterModal: () => { },
  submitFetchParkingRegisters: false,
  setSubmitFetchParkingRegisters: () => { },
});

export type Props = {
  children: ReactNode;
};

export const ParkingRegistersProvider: FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [parkingRegisters, setParkingRegisters] = useState<ParkingRegister[]>([]);
  const [selectedParkingRegisters, setSelectedParkingRegisters] = useState<ParkingRegister[]>([]);
  const [showCreateParkingRegisterModal, setShowCreateParkingRegisterModal] = useState<boolean>(false);
  const [showUpdateParkingRegisterModal, setShowUpdateParkingRegisterModal] = useState<boolean>(false);
  const [showDeleteParkingRegisterModal, setShowDeleteParkingRegisterModal] = useState<boolean>(false);
  const [showViewParkingRegisterModal, setShowViewParkingRegisterModal] = useState<boolean>(false);
  const [submitFetchParkingRegisters, setSubmitFetchParkingRegisters] = useState<boolean>(false);
  
  return (
    <ParkingRegistersContext.Provider value={{
      isLoading,
      parkingRegisters,
      setParkingRegisters,
      selectedParkingRegisters,
      setSelectedParkingRegisters,
      setIsLoading,
      showCreateParkingRegisterModal,
      setShowCreateParkingRegisterModal,
      showUpdateParkingRegisterModal,
      setShowUpdateParkingRegisterModal,
      showDeleteParkingRegisterModal,
      setShowDeleteParkingRegisterModal,
      showViewParkingRegisterModal,
      setShowViewParkingRegisterModal,
      submitFetchParkingRegisters,
      setSubmitFetchParkingRegisters
    }}>
      {children}
    </ParkingRegistersContext.Provider>
  );
};

