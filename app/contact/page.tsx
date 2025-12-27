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
                        <div>
                            <Card className="p-8">
                                <h2 className="font-serif text-2xl font-semibold mb-6">{t("contact.formTitle")}</h2>
                                {submitSuccess ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                                            <ArrowRight className="w-8 h-8 text-primary rotate-45" />
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2">{t("contact.successTitle")}</h3>
                                        <p className="text-muted-foreground">{t("contact.successMessage")}</p>
                                    </div>
                                ) : (
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                            <FormField control={form.control} name="name" render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{t("contact.name")} *</FormLabel>
                                                    <FormControl><Input placeholder={t("contact.namePlaceholder")} {...field} /></FormControl>
                                                </FormItem>
                                            )} />
                                            <FormField control={form.control} name="email" render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{t("contact.email")} *</FormLabel>
                                                    <FormControl><Input type="email" placeholder={t("contact.emailPlaceholder")} {...field} /></FormControl>
                                                </FormItem>
                                            )} />
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <FormField control={form.control} name="phone" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>{t("contact.phone")}</FormLabel>
                                                        <FormControl><Input type="tel" placeholder={t("contact.phonePlaceholder")} {...field} /></FormControl>
                                                    </FormItem>
                                                )} />
                                                <FormField control={form.control} name="role" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>{t("contact.role")}</FormLabel>
                                                        <FormControl><Input placeholder={t("contact.rolePlaceholder")} {...field} /></FormControl>
                                                    </FormItem>
                                                )} />
                                            </div>
                                            <FormField control={form.control} name="property" render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{t("contact.property")}</FormLabel>
                                                    <FormControl><Input placeholder={t("contact.propertyPlaceholder")} {...field} /></FormControl>
                                                </FormItem>
                                            )} />
                                            <FormField control={form.control} name="comment" render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{t("contact.message")}</FormLabel>
                                                    <FormControl><Textarea placeholder={t("contact.messagePlaceholder")} className="min-h-32" {...field} /></FormControl>
                                                </FormItem>
                                            )} />
                                            <FormField control={form.control} name="marketing" render={({ field }) => (
                                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                    <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                                    <div className="space-y-1 leading-none"><FormLabel className="text-sm font-normal text-muted-foreground">{t("contact.marketing")}</FormLabel></div>
                                                </FormItem>
                                            )} />
                                            <FormField control={form.control} name="dataProcessing" render={({ field }) => (
                                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                    <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                                    <div className="space-y-1 leading-none"><FormLabel className="text-sm font-normal text-muted-foreground">{t("contact.dataProcessing")} *</FormLabel></div>
                                                </FormItem>
                                            )} />
                                            <Button type="submit" size="lg" className="w-full" disabled={mutation.isPending}>
                                                {mutation.isPending ? t("contact.submitting") : t("contact.submit")}
                                                <ArrowRight className="ml-2 h-5 w-5" />
                                            </Button>
                                        </form>
                                    </Form>
                                )}
                            </Card>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <h2 className="font-serif text-2xl font-semibold mb-6">{t("contact.infoTitle")}</h2>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <Mail className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium mb-1">{t("contact.emailLabel")}</h3>
                                            <p className="text-muted-foreground"><a href="mailto:partnerships@hotelmol.com" className="hover:text-primary transition-colors">partnerships@hotelmol.com</a></p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <Phone className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium mb-1">{t("contact.phoneLabel")}</h3>
                                            <p className="text-muted-foreground"><a href="tel:+380931603830" className="hover:text-primary transition-colors">+380 93 160 38 30</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Card className="p-8 bg-primary/5">
                                <h3 className="font-serif text-xl font-semibold mb-4">{t("contact.officeHours")}</h3>
                                <div className="text-center py-4">
                                    <p className="text-3xl font-bold text-primary mb-2">24/7</p>
                                    <p className="text-3xl font-bold text-primary mb-4">365 {t("contact.daysPerYear")}</p>
                                    <p className="text-muted-foreground">{t("contact.availabilityDescription")}</p>
                                </div>
                            </Card>
                            <Card className="p-8">
                                <h3 className="font-serif text-xl font-semibold mb-4">{t("contact.quickSupport")}</h3>
                                <div className="flex gap-4 items-center justify-center">
                                    <Button variant="outline" size="icon" className="h-14 w-14" asChild>
                                        <a href="https://t.me/hotelmolmanager" target="_blank" rel="noopener noreferrer"><FaTelegram className="h-11 w-11 text-[#0088cc]" /></a>
                                    </Button>
                                    <Button variant="outline" size="icon" className="h-14 w-14" asChild>
                                        <a href="https://wa.me/380931603830" target="_blank" rel="noopener noreferrer"><FaWhatsapp className="h-11 w-11 text-[#25D366]" /></a>
                                    </Button>
                                    <Button variant="outline" size="icon" className="h-14 w-14" asChild>
                                        <a href="viber://chat?number=%2B380931603830" target="_blank" rel="noopener noreferrer"><FaViber className="h-11 w-11 text-[#7360f2]" /></a>
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
