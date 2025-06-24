import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../Components/UI/Dialog";
import { Button } from "../../Components/UI/Button";
import { Input } from "../../Components/UI/Input";
import { Label } from "../../Components/UI/Label";
import { Textarea } from "../../Components/UI/Textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../Components/UI/Select";

// Removed: import { toast } from "sonner";

export const ExpressInterestModal = ({ isOpen, onClose, startup }) => {
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@email.com",
    message: "",
    contactMethod: "email",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Optional: basic alert
    alert(`Interest request sent to ${startup?.founder?.name}!`);

    onClose();
    setFormData({ ...formData, message: "" });
  };

  if (!startup) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Express Interest in {startup.name}</DialogTitle>
          <DialogDescription>
            Send a message to {startup.founder.name} expressing your interest
            in their startup.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="contact-method">Preferred Contact Method</Label>
            <Select
              value={formData.contactMethod}
              onValueChange={(value) =>
                setFormData({ ...formData, contactMethod: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="platform">Platform Message</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea
              id="message"
              placeholder="Tell them why you're interested in their startup..."
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              rows={4}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Send Interest Request</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
