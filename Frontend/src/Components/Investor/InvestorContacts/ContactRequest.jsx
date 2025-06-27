import { Card, CardContent, CardHeader, CardTitle } from "../../UI/Card";
import ContactRequestCard from "./ContactRequestCard";
import { mockContactRequests } from "../../Investor/MockInvestorData";

const ContactRequest = () => (
    <Card>
        <CardHeader>
            <CardTitle>Recent Contact Requests</CardTitle>
        </CardHeader>

        <CardContent>
            <div className="space-y-4">
                {mockContactRequests.map((request) => (
                    <ContactRequestCard key={request.id} request={request} />
                ))}
            </div>
        </CardContent>
    </Card>
);

export default ContactRequest;
