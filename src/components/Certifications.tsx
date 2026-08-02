import { getCertifications } from "@/sanity/lib/queries";
import CertificationsClient from "./CertificationsClient";

export default async function Certifications() {
  let certifications = [];
  
  try {
    certifications = await getCertifications();
  } catch (err) {
    console.error("Error fetching certifications from Sanity:", err);
  }

  return <CertificationsClient certifications={certifications} />;
}