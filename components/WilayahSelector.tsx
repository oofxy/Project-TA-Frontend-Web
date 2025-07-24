"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { NewForm } from "@/app/features/onboarding/schema";
import { useFormContext as useCustomFormContext } from "@/app/features/onboarding/context";

type WilayahOption = {
  id: number;
  name: string;
  kabupatens: {
    id: number;
    name: string;
    provinsi_id: number;
    kecamatans: {
      id: number;
      name: string;
      kabupaten_id: number;
      kelurahans: {
        id: number;
        name: string;
        kecamatan_id: number;
      }[];
    }[];
  }[];
};

export function WilayahSelector() {
  const { control, setValue, getValues, watch, clearErrors } =
    useFormContext<NewForm>();
  const { updateNewFormDetails } = useCustomFormContext();

  const provId = watch("provinsi_id");
  const kabId = watch("kabupaten_id");
  const kecId = watch("kecamatan_id");

  const [data, setData] = useState<WilayahOption[]>([]);
  const [kabupaten, setKabupaten] = useState<WilayahOption["kabupatens"]>([]);
  const [kecamatan, setKecamatan] = useState<
    WilayahOption["kabupatens"][0]["kecamatans"]
  >([]);
  const [kelurahan, setKelurahan] = useState<
    WilayahOption["kabupatens"][0]["kecamatans"][0]["kelurahans"]
  >([]);

  useEffect(() => {
    fetch("/api/wilayah")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      });
  }, []);

  // Auto-restore dari localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("personal_form") || "{}");

    if (stored.provinsi_id) setValue("provinsi_id", stored.provinsi_id);
    if (stored.kabupaten_id) setValue("kabupaten_id", stored.kabupaten_id);
    if (stored.kecamatan_id) setValue("kecamatan_id", stored.kecamatan_id);
    if (stored.kelurahan_id) setValue("kelurahan_id", stored.kelurahan_id);
  }, [data]);

  useEffect(() => {
    if (data.length === 0) return;

    const stored = JSON.parse(localStorage.getItem("personal_form") || "{}");

    const prov = data.find((p) => p.id === Number(stored.provinsi_id));
    if (!prov) return;

    setValue("provinsi_id", stored.provinsi_id);
    setKabupaten(prov.kabupatens);

    const kab = prov.kabupatens.find(
      (k) => k.id === Number(stored.kabupaten_id)
    );
    if (!kab) return;

    setValue("kabupaten_id", stored.kabupaten_id);
    setKecamatan(kab.kecamatans);

    const kec = kab.kecamatans.find(
      (k) => k.id === Number(stored.kecamatan_id)
    );
    if (!kec) return;

    setValue("kecamatan_id", stored.kecamatan_id);
    setKelurahan(kec.kelurahans);

    const kel = kec.kelurahans.find(
      (k) => k.id === Number(stored.kelurahan_id)
    );
    if (!kel) return;

    setValue("kelurahan_id", stored.kelurahan_id);
  }, [data]);

  useEffect(() => {
    if (!provId || data.length === 0) return;

    const prov = data.find((p) => p.id === Number(provId));
    const kabs = prov?.kabupatens || [];
    setKabupaten(kabs);

    const currentKab = getValues("kabupaten_id");
    if (!currentKab || !kabs.some((k) => k.id === Number(currentKab))) {
      setValue("kabupaten_id", "");
      setValue("kecamatan_id", "");
      setValue("kelurahan_id", "");
      setKecamatan([]);
      setKelurahan([]);
    }
  }, [provId, data]);

  useEffect(() => {
    if (!kabId || kabupaten.length === 0) return;

    const kab = kabupaten.find((k) => k.id === Number(kabId));
    const kecs = kab?.kecamatans || [];
    setKecamatan(kecs);

    const currentKec = getValues("kecamatan_id");
    if (!currentKec || !kecs.some((k) => k.id === Number(currentKec))) {
      setValue("kecamatan_id", "");
      setValue("kelurahan_id", "");
      setKelurahan([]);
    }
  }, [kabId, kabupaten]);

  useEffect(() => {
    if (!kecId || kecamatan.length === 0) return;

    const kec = kecamatan.find((k) => k.id === Number(kecId));
    const kels = kec?.kelurahans || [];
    setKelurahan(kels);

    const currentKel = getValues("kelurahan_id");
    if (!currentKel || !kels.some((k) => k.id === Number(currentKel))) {
      setValue("kelurahan_id", "");
    }
  }, [kecId, kecamatan]);

  const wilayahFields = [
    { name: "provinsi_id", label: "Provinsi", options: data },
    { name: "kabupaten_id", label: "Kabupaten", options: kabupaten },
    { name: "kecamatan_id", label: "Kecamatan", options: kecamatan },
    { name: "kelurahan_id", label: "Kelurahan", options: kelurahan },
  ];

  const saveToLocalStorage = (key: string, value: string, label: string) => {
    const stored = JSON.parse(localStorage.getItem("personal_form") || "{}");
    stored[key] = value;
    stored[`${key.replace("_id", "_nama")}`] = label;
    localStorage.setItem("personal_form", JSON.stringify(stored));
  };

  return (
    <>
      {wilayahFields.map((field) => (
        <FormField
          key={field.name}
          control={control}
          name={field.name as keyof NewForm}
          render={({ field: formField, fieldState }) => (
            <FormItem>
              <FormLabel>{field.label}</FormLabel>
              <Select
                onValueChange={(val) => {
                  const selectedOption = field.options.find(
                    (opt) => opt.id.toString() === val
                  );
                  setValue(field.name as keyof NewForm, val, {
                    shouldValidate: true,
                  });
                  clearErrors(field.name as keyof NewForm);

                  updateNewFormDetails({
                    [field.name]: val,
                    [`${field.name.replace("_id", "_nama")}`]:
                      selectedOption?.name || "",
                  });

                  saveToLocalStorage(
                    field.name,
                    val,
                    selectedOption?.name || ""
                  );
                }}
                value={formField.value?.toString() || ""}
                disabled={
                  (field.name === "kabupaten_id" && !provId) ||
                  (field.name === "kecamatan_id" && !kabId) ||
                  (field.name === "kelurahan_id" && !kecId)
                }
              >
                <FormControl>
                  <SelectTrigger
                    className={cn(
                      "w-full",
                      fieldState.error && "border-red-500"
                    )}
                  >
                    <SelectValue placeholder={`Pilih ${field.label}`} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {field.options.map((opt) => (
                    <SelectItem key={opt.id} value={opt.id.toString()}>
                      {opt.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </>
  );
}
