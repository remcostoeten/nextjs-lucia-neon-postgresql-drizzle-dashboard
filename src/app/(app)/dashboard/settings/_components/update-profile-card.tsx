"use client";

import { Button,Input,Textarea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "ui";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";
import { AccountCard, AccountCardBody, AccountCardFooter } from "./AccountCard";
import { updateUserProfile } from "@/lib/actions/users";

interface UserProfile {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    occupation: string;
    gender: string;
    bio: string;
    github: string;
    facebook: string;
    linkedin: string;
    twitter: string;
}

export default function UpdateProfileCard({ userProfile }: { userProfile: UserProfile }) {
    const [state, formAction] = useFormState(updateUserProfile, {
        error: "",
    });

    useEffect(() => {
        if (state.success === true) toast.success("Updated Profile");
        if (state.error) toast.error("Error", { description: state.error });
    }, [state]);

    return (
        <AccountCard
            params={{
                header: "Your Profile",
                description: "Update your profile information here.",
            }}
        >
            <form action={formAction}>
                <AccountCardBody>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Input defaultValue={userProfile?.firstName ?? ""} name="firstName" placeholder="First Name" />
                            <Input defaultValue={userProfile?.lastName ?? ""} name="lastName" placeholder="Last Name" />
                        </div>
                        <Input type="date" defaultValue={userProfile?.dateOfBirth ?? ""} name="dateOfBirth" />
                        <Input defaultValue={userProfile?.occupation ?? ""} name="occupation" placeholder="Occupation" />
                        <Select name="gender" defaultValue={userProfile?.gender ?? ""}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                            </SelectContent>
                        </Select>
                        <Textarea defaultValue={userProfile?.bio ?? ""} name="bio" placeholder="Bio" />
                        <Input defaultValue={userProfile?.github ?? ""} name="github" placeholder="GitHub URL" />
                        <Input defaultValue={userProfile?.facebook ?? ""} name="facebook" placeholder="Facebook URL" />
                        <Input defaultValue={userProfile?.linkedin ?? ""} name="linkedin" placeholder="LinkedIn URL" />
                        <Input defaultValue={userProfile?.twitter ?? ""} name="twitter" placeholder="Twitter URL" />
                    </div>
                </AccountCardBody>
                <AccountCardFooter description="Update your profile information">
                    <Submit />
                </AccountCardFooter>
            </form>
        </AccountCard>
    );
}

const Submit = () => {
    const { pending } = useFormStatus();
    return <Button disabled={pending}>Update Profile</Button>;
};
