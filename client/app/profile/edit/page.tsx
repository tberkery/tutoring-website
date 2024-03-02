"use client";
import  React from "react";
import "../../../styles/global.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Navbar from "../../../components/Navbar";
import { Button } from "components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form";
import { Input } from "components/ui/input";
const MAX_BIO_LENGTH = 200;

const formSchema = z.object({
    picture: z.string(),
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address").nonempty("Email is required"),
    department: z.string().min(1, "Department is required"),
    year: z.string().min(1, "Year is required"),
    description: z.string().min(1, "Description is required").max(MAX_BIO_LENGTH, `Bio must be at most ${MAX_BIO_LENGTH} characters`),
});

type ProfileFormData = z.infer<typeof formSchema>;

export function EditProfile() {
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        picture: "",
        name: "",
        email: "nfogart1@jhu.edu",
        department: "",
        year: "",
        description: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center min-h-screen">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/3 space-y-6">
          <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
          {/*Picture Field */}
          <FormField
            control={form.control}
            name="picture"
            render={({ field, fieldState }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-bold" htmlFor="picture">Profile Picture</FormLabel>
                <FormControl>
                  <Input id="picture" type="file" {...field} />
                </FormControl>
                {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-bold" htmlFor="name">Name</FormLabel>
                <FormControl>
                  <Input id="name" placeholder="Name" {...field} />
                </FormControl>
                {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
              </FormItem>
            )}
          />
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-bold" htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input disabled className="bg-gray-400" id="email" placeholder="email@example.com" {...field} />
                </FormControl>
                <FormDescription>
                This is your JHU email and cannot be changed. 
              </FormDescription>
                {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
              </FormItem>
            )}
          />
          {/* Department Field */}
          <FormField
            control={form.control}
            name="department"
            render={({ field, fieldState }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-bold" htmlFor="department">Major / Department</FormLabel>
                <FormControl>
                  <Input id="department" placeholder="Major / Department" {...field} />
                </FormControl>
                {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
              </FormItem>
            )}
          />
          {/* Year Field */}
          <FormField
            control={form.control}
            name="year"
            render={({ field, fieldState }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-bold" htmlFor="year">Year</FormLabel>
                <FormControl>
                  <Input id="year" placeholder="Year" {...field} />
                </FormControl>
                {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field, fieldState }) => (
                <FormItem className="mb-4">
                <FormLabel className="font-bold" htmlFor="description">Bio</FormLabel>
                <FormControl>
                    <Input id="description" placeholder="Bio" maxLength={MAX_BIO_LENGTH} {...field} />
                </FormControl>
                <div className="text-right text-sm">
                    {`${field.value?.length || 0} / ${MAX_BIO_LENGTH} characters`}
                </div>
                {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
                </FormItem>
            )}
            />
            <Button type="submit" className="mt-6 bg-custom-blue hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md">
              Submit
            </Button>
        </form>
      </Form>
      </div>
    </>
  );
}

export default EditProfile;
