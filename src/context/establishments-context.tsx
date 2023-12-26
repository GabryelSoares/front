"use client"
import React, { createContext, FC, ReactNode, useState } from 'react';
import { Establishment } from '@/_core/domain/models/establishment';

export type EstablishmentsContextValue = {
  isLoading: boolean;
  establishments: Establishment[];
  setEstablishments: (establishments: Establishment[]) => void;
  selectedEstablishments: Establishment[];
  setSelectedEstablishments: (establishments: Establishment[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  showCreateEstablishmentModal: boolean;
  setShowCreateEstablishmentModal: (showCreateEstablishmentModal: boolean) => void;
  showUpdateEstablishmentModal: boolean;
  setShowUpdateEstablishmentModal: (showUpdateEstablishmentModal: boolean) => void;
  showDeleteEstablishmentModal: boolean;
  setShowDeleteEstablishmentModal: (showDeleteEstablishmentModal: boolean) => void;
  showViewEstablishmentModal: boolean;
  setShowViewEstablishmentModal: (showViewEstablishmentModal: boolean) => void;
  submitFetchEstablishments: boolean;
  setSubmitFetchEstablishments: (submitFetchEstablishments: boolean) => void;
};

export const EstablishmentsContext: React.Context<EstablishmentsContextValue> = createContext<EstablishmentsContextValue>({
  isLoading: false,
  establishments: [],
  setEstablishments: () => { },
  selectedEstablishments: [],
  setSelectedEstablishments: () => { },
  setIsLoading: () => { },
  showCreateEstablishmentModal: false,
  setShowCreateEstablishmentModal: () => { },
  showUpdateEstablishmentModal: false,
  setShowUpdateEstablishmentModal: () => { },
  showDeleteEstablishmentModal: false,
  setShowDeleteEstablishmentModal: () => { },
  showViewEstablishmentModal: false,
  setShowViewEstablishmentModal: () => { },
  submitFetchEstablishments: false,
  setSubmitFetchEstablishments: () => { },
});

export type Props = {
  children: ReactNode;
};

export const EstablishmentsProvider: FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  const [selectedEstablishments, setSelectedEstablishments] = useState<Establishment[]>([]);
  const [showCreateEstablishmentModal, setShowCreateEstablishmentModal] = useState<boolean>(false);
  const [showUpdateEstablishmentModal, setShowUpdateEstablishmentModal] = useState<boolean>(false);
  const [showDeleteEstablishmentModal, setShowDeleteEstablishmentModal] = useState<boolean>(false);
  const [showViewEstablishmentModal, setShowViewEstablishmentModal] = useState<boolean>(false);
  const [submitFetchEstablishments, setSubmitFetchEstablishments] = useState<boolean>(false);
  
  return (
    <EstablishmentsContext.Provider value={{
      isLoading,
      establishments,
      setEstablishments,
      selectedEstablishments,
      setSelectedEstablishments,
      setIsLoading,
      showCreateEstablishmentModal,
      setShowCreateEstablishmentModal,
      showUpdateEstablishmentModal,
      setShowUpdateEstablishmentModal,
      showDeleteEstablishmentModal,
      setShowDeleteEstablishmentModal,
      showViewEstablishmentModal,
      setShowViewEstablishmentModal,
      submitFetchEstablishments,
      setSubmitFetchEstablishments
    }}>
      {children}
    </EstablishmentsContext.Provider>
  );
};

