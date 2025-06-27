import ContactRequest from "../../Components/Investor/InvestorContacts/ContactRequest";
import ContactStatus from "../../Components/Investor/InvestorContacts/ContactStatus";

const InvestorContacts = () => {


  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Contact Requests</h1>
        <p className="text-gray-600">Track your connection attempts with startup founders</p>
      </div>
      <ContactStatus />
      <ContactRequest />
    </div>
  );
};

export default InvestorContacts;