"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  ChildForm,
  NewForm,
  newFormInitialValuesSchema,
  NewFormInitialValuesType,
} from "./schema";

const defaultForm: NewFormInitialValuesType = {
  nama: "",
  nip: "",
  nik: "",
  email: "",
  telephone: "",
  tempat_lahir: "",
  tanggal_lahir: "",
  alamat: "",
  nama_pasangan: "",
  tempat_lahir_pasangan: "",
  pekerjaan_pasangan: "",
  telephone_pasangan: "",
  nama_ayah: "",
  nama_ibu: "",
  alamat_ayah: "",
  alamat_ibu: "",
  children: [],
};

type FormContextType = {
  newFormData: NewFormInitialValuesType;
  updateNewFormDetails: (formDetails: Partial<NewForm>) => void;
  addChild: (child: ChildForm) => void;
  removeChild: (index: number) => void;
  dataLoaded: boolean;
  resetData: () => void;
};

const LOCAL_STORAGE_KEY = "form-key-newFormData";

export const FormContext = createContext<FormContextType | null>(null);

export const FormContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [newFormData, setNewFormData] =
    useState<NewFormInitialValuesType>(defaultForm);

  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    readFromLocalStorage();
    setDataLoaded(true);
  }, []);

  const writeToLocalStorage = useCallback(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newFormData));
  }, [newFormData]);

  useEffect(() => {
    writeToLocalStorage();
  }, [newFormData, dataLoaded, writeToLocalStorage]);

  const readFromLocalStorage = () => {
    console.log("Reading local storage");
    const dataString = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!dataString) {
      return setNewFormData(defaultForm);
    }

    const validated = newFormInitialValuesSchema.safeParse(
      JSON.parse(dataString)
    );
    console.log(validated);

    if (validated.success) {
      setNewFormData(validated.data);
    } else {
      setNewFormData(defaultForm);
    }
  };

  const updateNewFormDetails = (formDetails: Partial<NewForm>) => {
    setNewFormData((prev) => ({ ...prev, ...formDetails }));
  };

  const resetData = () => {
    setNewFormData(defaultForm);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultForm));
  };

  const addChild = (child: ChildForm) => {
    setNewFormData((prev) => ({
      ...prev,
      children: [...(prev.children || []), child],
    }));
  };

  const removeChild = (index: number) => {
    setNewFormData((prev) => ({
      ...prev,
      children: prev.children?.filter((_, i) => i !== index),
    }));
  };

  return (
    <FormContext.Provider
      value={{
        newFormData,
        updateNewFormDetails,
        dataLoaded,
        resetData,
        addChild,
        removeChild,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within an FormContext");
  }
  return context;
}
