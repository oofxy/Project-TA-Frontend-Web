import {
  NewForm,
  parentSchema,
  partnerSchema,
  personalSchema,
} from "@/app/features/onboarding/schema";
import { FormDataRoutes } from "@/lib/utils";

export type SubmitFormActionType = {
  redirect?: FormDataRoutes;
  errorMsg?: string;
  success?: boolean;
};

export const submitFormAction = async (
  form: NewForm
): Promise<SubmitFormActionType> => {
  const personalFormValidated = personalSchema.safeParse(form);
  if (!personalFormValidated.success) {
    return {
      redirect: FormDataRoutes.PERSONAL_DATA,
      errorMsg: "Tolong Validasi Data Diri Anda",
    };
  }

  const partnerFormValidated = partnerSchema.safeParse(form);
  if (!partnerFormValidated.success) {
    return {
      redirect: FormDataRoutes.PARTNER_DATA,
      errorMsg: "Tolong Validasi Data Pasangan Anda",
    };
  }

  const parentsFormValidated = parentSchema.safeParse(form);
  if (!parentsFormValidated.success) {
    return {
      redirect: FormDataRoutes.PARENT_DATA,
      errorMsg: "Tolong Validasi Data Orang Tua Anda",
    };
  }

  const payload = {
    name: form.nama,
    nip: form.nip,
    nik: form.nik,
    email: form.email,
    telephone: form.telephone,
    tempat_lahir: form.tempat_lahir,
    tanggal_lahir: form.tanggal_lahir,
    alamat: form.alamat,
    // kelurahan_id: form.kelurahan_id,
    // pendidikan_id: form.pendidikan_id,
    npwp: form.npwp,
    // jenis_kelamin_id: form.jenis_kelamin_id,
    // mulai_tugas: form.mulai_tugas,
    // pangkat_id: form.pangkat_id,
    // jabatan_id: form.jabatan_id,
    // pekerjaan_id: form.pekerjaan_id,
    // golongan_id: form.golongan_id,
    // divisi_id: form.divisi_id,
    // agama_id: form.agama_id,
    // lokasi_kantor_id: form.lokasi_kantor_id,
    // lokasi_kerja_id: form.lokasi_kerja_id,
    nama_pasangan: form.nama_pasangan,
    tempat_lahir_pasangan: form.tempat_lahir_pasangan,
    pekerjaan_id_pasangan: form.pekerjaan_pasangan,
    telephone_pasangan: form.telephone_pasangan,
    nama_ayah: form.nama_ayah,
    nama_ibu: form.nama_ibu,
    alamat_ayah: form.alamat_ayah,
    alamat_ibu: form.alamat_ibu,
    aktif: 1,
  };

  const childrenPayload = {
    nama_anak: form.children,
  };

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}karyawan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const error = await res.json();
      console.log("Error response", error);
      return {
        success: false,
        errorMsg: error.message || "Gagal menyimpan data",
      };
    }

    const created = await res.json();
    const karyawanId = created.id;

    for (const child of form.children || []) {
      const childPayload = {
        id: karyawanId,
        nama_anak: child.nama_anak,
        nik_anak: child.nik_anak,
        tempat_lahir_anak: child.tempat_lahir_anak,
        tanggal_lahir_anak: child.tanggal_lahir_anak,
      };

      const childRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}anak`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
        body: JSON.stringify(childPayload),
      });

      if (!childRes.ok) {
        const error = await childRes.json();
        console.log("Error response", error);
        return {
          success: false,
          errorMsg: error.message || "Gagal menyimpan data",
        };
      }
    }

    return {
      success: true,
      redirect: FormDataRoutes.PERSONAL_DATA,
    };
  } catch (error: any) {
    return {
      success: false,
      errorMsg: error.message || "Kesalahan jaringan",
    };
  }
};
