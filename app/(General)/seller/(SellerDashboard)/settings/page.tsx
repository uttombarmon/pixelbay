import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProfileForm from "@/components/customs/seller/settings/ProfileForm";
import ShopForm from "@/components/customs/seller/settings/ShopForm";
import PaymentForm from "@/components/customs/seller/settings/PaymentForm";
import PreferencesForm from "@/components/customs/seller/settings/PreferencesForm";

export default async function SettingsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Settings</h2>
      <p className="text-muted-foreground">
        Manage your account, shop, and preferences here.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile */}
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <ProfileForm />
          </CardContent>
        </Card>

        {/* Shop Info */}
        <Card>
          <CardHeader>
            <CardTitle>Shop Information</CardTitle>
          </CardHeader>
          <CardContent>
            <ShopForm />
          </CardContent>
        </Card>

        {/* Payment */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <PaymentForm />
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <PreferencesForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
