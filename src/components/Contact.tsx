// Path: src/components/Contact.tsx
import { getContactData } from "@/sanity/lib/queries";
import ContactClient from "./ContactClient";

export default async function Contact() {
  let contactData = undefined;
  try {
    contactData = await getContactData();
  } catch (err) {
    console.error("Error fetching contact data from Sanity:", err);
  }

  return <ContactClient contactData={contactData} />;
}