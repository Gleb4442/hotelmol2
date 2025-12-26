"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Mail, Phone, ArrowRight } from "lucide-react";
import { FaTelegram, FaWhatsapp, FaViber } from "react-icons/fa";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/lib/TranslationContext";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { apiRequest } from "@/lib/queryClient";
import { contactLeadSchema, type ContactLead } from "@/shared/schema";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO, { organizationSchema } from "@/components/SEO";

export default function Contact() {
    const { toast } = useToast();
    const { t } = useTranslation();
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const form = useForm<ContactLead>({
        resolver: zodResolver(contactLeadSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            property: "",
            role: "",
            comment: "",
            marketing: false,
            dataProcessing: false,
        },
    });

    const mutation = useMutation({
        mutationFn: async (data: ContactLead) => {
            return await apiRequest("POST", "/api/leads/contact", data);
        },
        onSuccess: () => {
            setSubmitSuccess(true);
            form.reset();
            toast({
                title: t("contact.successTitle"),
                description: t("contact.successMessage"),
            });
        },
        onError: (error: any) => {
            toast({
                variant: "destructive",
                title: t("error.general"),
                description: error.message || t("error.messageFailed"),
            });
        },
    });

    const onSubmit = (data: ContactLead) => {
        mutation.mutate(data);
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-40 pb-28">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h1 className="font-serif text-5xl lg:text-6xl font-semibold tracking-tight mb-6">
                            {t("contact.title")}
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            {t("contact.subtitle")}
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        <Card className="p-8">
                            <h2 className="font-serif text-2xl font-semibold mb-6">{t("contact.formTitle")}</h2>
                            {submitSuccess ? (
                                <div className="text-center py-12">
                                    <h3 className="text-xl font-semibold mb-2">{t("contact.successTitle")}</h3>
                                    <p className="text-muted-foreground">{t("contact.successMessage")}</p>
                                </div>
                            ) : (
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                        <FormField control={form.control} name="name" render={({ field }) => (
                                            <FormItem><FormLabel>{t("contact.name")}</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                                        )} />
                                        <FormField control={form.control} name="email" render={({ field }) => (
                                            <FormItem><FormLabel>{t("contact.email")}</FormLabel><FormControl><Input type="email" {...field} /></FormControl></FormItem>
                                        )} />
                                        <FormField control={form.control} name="comment" render={({ field }) => (
                                            <FormItem><FormLabel>{t("contact.message")}</FormLabel><FormControl><Textarea {...field} /></FormControl></FormItem>
                                        )} />
                                        <Button type="submit" className="w-full" disabled={mutation.isPending}>
                                            {mutation.isPending ? t("contact.submitting") : t("contact.submit")}
                                        </Button>
                                    </form>
                                </Form>
                            )}
                        </Card>

                        <div className="space-y-8">
                            <h2 className="font-serif text-2xl font-semibold mb-6">{t("contact.infoTitle")}</h2>
                            <div className="space-y-4">
                                <p>Email: partnerships@hotelmol.com</p>
                                <p>Phone: +380 93 160 38 30</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
