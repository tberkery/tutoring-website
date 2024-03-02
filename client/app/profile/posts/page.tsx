"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import "../../../styles/global.css";
import Navbar from "../../../components/Navbar";
import { Button } from "components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form";
import { Input } from "components/ui/input";

const postFormSchema = z.object({
    username: z.string(),
    courseId: z.string(),
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    picture: z.string().optional(),
    price: z.string().min(1, "Price is required"),
  });
  
  type PostFormData = z.infer<typeof postFormSchema>;
  

export function CreatePost() {
  const form = useForm<PostFormData>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      username: "",
      courseId: "",
      title: "",
      description: "",
      picture: "",
      price: "",
    },
  });

  function onSubmit(data: z.infer<typeof postFormSchema>) {
    console.log(data);
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center min-h-screen">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/3 space-y-6">
            <h1 className="text-2xl font-bold mb-4">Create Post</h1>
            {/*Picture Field */}
            <FormField
              control={form.control}
              name="picture"
              render={({ field, fieldState }) => (
                <FormItem className="mb-4">
                  <FormLabel className="font-bold" htmlFor="picture">Image</FormLabel>
                  <FormControl>
                    <Input id="picture" type="file" {...field} />
                  </FormControl>
                  {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
                </FormItem>
              )}
            />
            {/* Title Field */}
            <FormField name="title" control={form.control} render={({ field, fieldState }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-bold" htmlFor="title">Title</FormLabel>
                <FormControl>
                  <Input id="title" placeholder="Title" {...field} />
                </FormControl>
                {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
              </FormItem>
            )} />
            {/* Course ID Field */}
            <FormField name="courseId" control={form.control} render={({ field, fieldState }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-bold" htmlFor="courseId">Course ID</FormLabel>
                <FormControl>
                  <Input id="courseId" placeholder="Course ID" {...field} />
                </FormControl>
                {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
              </FormItem>
            )} />
            {/* Description Field */}
            <FormField name="description" control={form.control} render={({ field, fieldState }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-bold" htmlFor="description">Description</FormLabel>
                <FormControl>
                  <Input id="description" placeholder="Description" {...field} />
                </FormControl>
                {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
              </FormItem>
            )} />
            {/* Price Field */}
            <FormField name="price" control={form.control} render={({ field, fieldState }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-bold" htmlFor="price">Price</FormLabel>
                <FormControl>
                  <Input id="price" placeholder="Price" {...field} />
                </FormControl>
                {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
              </FormItem>
            )} />
            <Button type="submit" className="mt-6 bg-custom-blue hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}

export default CreatePost;
