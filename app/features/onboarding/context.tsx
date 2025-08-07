  "use client";

  import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    useMemo,
  } from "react";
  import {
    MyChildForm,
    NewForm,
    newFormInitialValuesSchema,
    NewFormInitialValuesType,
  } from "./schema";

  const LOCAL_STORAGE_KEY = "form-key-newFormData";

  const defaultForm: NewFormInitialValuesType = {
    nama: "",
    nip: "",
    nik: "",
    email: "",
    telephone: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    alamat: "",

    provinsi_id: "",
    kabupaten_id: "",
    kecamatan_id: "",
    kelurahan_id: "",
    provinsi_nama: "",
    kabupaten_nama: "",
    kecamatan_nama: "",
    kelurahan_nama: "",

    npwp: "",

    agama_id: "",
    agama_nama: "",

    pendidikan_id: "",
    pendidikan_nama: "",

    jenis_kelamin_id: "",
    jenis_kelamin_nama: "",

    pangkat_id: "",
    pangkat_nama: "",

    jabatan_id: "",
    jabatan_nama: "",

    pekerjaan_id: "",
    pekerjaan_nama: "",

    golongan_id: "",
    golongan_nama: "",

    divisi_id: "",
    divisi_nama: "",

    status_id: "",
    status_nama: "",

    lokasi_kantor_id: "",
    lokasi_kantor_nama: "",

    lokasi_kerja_id: "",
    lokasi_kerja_nama: "",

    mulai_tugas: "",

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
    addChild: (child: MyChildForm) => void;
    removeChild: (index: number) => void;
    updateChild: (index: number, child: Partial<MyChildForm>) => void;
    dataLoaded: boolean;
    resetData: () => void;
  };

  const FormContext = createContext<FormContextType | null>(null);

  export const FormContextProvider = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    const [newFormData, setNewFormData] =
      useState<NewFormInitialValuesType>(defaultForm);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
      const loadData = () => {
        try {
          const dataString = localStorage.getItem(LOCAL_STORAGE_KEY);
          if (!dataString) return;

          const parsedData = JSON.parse(dataString);
          const validated = newFormInitialValuesSchema.safeParse(parsedData);

          if (validated.success) {
            setNewFormData(validated.data);
          } else {
            console.warn("Invalid localStorage data, resetting to default");
            localStorage.removeItem(LOCAL_STORAGE_KEY);
          }
        } catch (error) {
          console.error("Error reading from localStorage:", error);
        } finally {
          setDataLoaded(true);
        }
      };

      loadData();
    }, []);

    const writeToLocalStorage = useCallback((data: NewFormInitialValuesType) => {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
      } catch (error) {
        console.error("Error writing to localStorage:", error);
      }
    }, []);

    const updateNewFormDetails = useCallback(
      (formDetails: Partial<NewForm>) => {
        setNewFormData((prev) => {
          const updated = { ...prev, ...formDetails };
          writeToLocalStorage(updated);
          return updated;
        });
      },
      [writeToLocalStorage]
    );

    const addChild = useCallback(
      (child: MyChildForm) => {
        setNewFormData((prev) => {
          const updated = {
            ...prev,
            children: [...(prev.children || []), child],
          };
          writeToLocalStorage(updated);
          return updated;
        });
      },
      [writeToLocalStorage]
    );

    const removeChild = useCallback(
      (index: number) => {
        setNewFormData((prev) => {
          const updated = {
            ...prev,
            children: prev.children?.filter((_, i) => i !== index) || [],
          };
          writeToLocalStorage(updated);
          return updated;
        });
      },
      [writeToLocalStorage]
    );

    const updateChild = useCallback(
      (index: number, child: Partial<MyChildForm>) => {
        setNewFormData((prev) => {
          if (!prev.children || index >= prev.children.length) return prev;

          const updatedChildren = [...prev.children];
          updatedChildren[index] = { ...updatedChildren[index], ...child };

          const updated = { ...prev, children: updatedChildren };
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
          return updated;
        });
      },
      []
    );

    const resetData = useCallback(() => {
      setNewFormData(defaultForm);
      writeToLocalStorage(defaultForm);
    }, [writeToLocalStorage]);

    const contextValue = useMemo(
      () => ({
        newFormData,
        updateNewFormDetails,
        dataLoaded,
        resetData,
        addChild,
        removeChild,
        updateChild,
      }),
      [
        newFormData,
        updateNewFormDetails,
        dataLoaded,
        resetData,
        addChild,
        removeChild,
        updateChild,
      ]
    );

    return (
      <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
    );
  };

  export function useFormContext() {
    const context = useContext(FormContext);
    if (!context) {
      throw new Error("useFormContext must be used within a FormContextProvider");
    }
    return context;
  }
