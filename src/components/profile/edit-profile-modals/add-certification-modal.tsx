import React from "react";
import { AddCertificationModalProps } from "../../../constants/interface";
import { userService } from "../../../services/user.service";
import { toast } from "react-toastify";

export const AddCertificationModal: React.FC<AddCertificationModalProps> = ({ setShowAddCertificationModal }) => {
  const [certificationData, setCertificationData] = React.useState({
    certificationName: "",
    issuingOorganization: "",
    issueDate: "",
    expirationDate: "",
    credentialId: "",
    credentialUrl: "",
    description: ""
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCertificationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const certifications = {
      certifications: [certificationData]
    }
    try {
      const email = localStorage.getItem("email");
      const login = await userService.updateUser(email, certifications);
      if (login) {
        toast("Certifications updated successfully");
      }
      else {
        toast.error("Error in updating certifications");
      }
    }
    catch (error) {
      toast.error("Error during upadating certifications. Please try again.");
    }
  }

  return (
    <div className="p-7 bg-white rounded-md max-h-[98vh] overflow-y-auto scrollbar-thin">
      <h2 className="sub-heading mb-1">Add Certificate</h2>
      <p className="mb-4 text">Add your certificate, including name, authority, issued date, expiration date, credential id, credential url.</p>
      <div className="flex flex-col gap-1">
        <label className="label">Name <span className="primary-text">*</span></label>
        <input type="text" placeholder="Ex: Certificate of Completion" name="certificationName" className="input-field" onChange={handleChange} value={certificationData.certificationName} />
      </div>

      <div className="flex flex-col gap-1 mt-2">
        <label className="label">Issued Organization <span className="primary-text">*</span></label>
        <input type="text" placeholder="Ex: Google" name="issuingOorganization" className="input-field" onChange={handleChange} value={certificationData.issuingOorganization} />
      </div>

      <div className="flex flex-col gap-1 mt-2">
        <label className="label">Issued Date <span className="primary-text">*</span></label>
        <input type="date" name="issueDate" className="input-field" onChange={handleChange} value={certificationData.issueDate} />
      </div>

      <div className="flex flex-col gap-1 mt-2">
        <label className="label">Expiration Date <span className="primary-text">*</span></label>
        <input type="date" name="expirationDate" className="input-field" onChange={handleChange} value={certificationData.expirationDate} />
      </div>

      <div className="flex flex-col gap-1 mt-2">
        <label className="label">Credential ID <span className="primary-text">*</span></label>
        <input type="text" placeholder="Ex: 12345678" name="credentialId" className="input-field" onChange={handleChange} value={certificationData.credentialId} />
      </div>

      <div className="flex flex-col gap-1 mt-2">
        <label className="label">Credential URL <span className="primary-text">*</span></label>
        <input type="text" placeholder="Ex: https://example.com/certificate/12345" name="credentialUrl" className="input-field" onChange={handleChange} value={certificationData.credentialUrl} required />
      </div>

      <div className="flex flex-col gap-1 mt-2">
        <label className="label">Description</label>
        <textarea rows={4} placeholder="Add any additional details, activities, or socities..." name="description" className="input-field" onChange={handleChange} value={certificationData.description}></textarea>
      </div>

      <div className="flex justify-between mt-4">
        <button type="submit" className="cancel-button" onClick={() => setShowAddCertificationModal(false)}>Cancel</button>
        <button type="submit" className="btn-primary !w-auto !px-10" onClick={handleSubmit}>Confirm</button>
      </div>
    </div>
  );
};