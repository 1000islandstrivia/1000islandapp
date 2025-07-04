
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { addQuestionAction, type AddQuestionFormValues } from "@/actions/addQuestionAction";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  question: z.string().min(10, "Question must be at least 10 characters."),
  option1: z.string().min(1, "Option 1 is required."),
  option2: z.string().min(1, "Option 2 is required."),
  option3: z.string().min(1, "Option 3 is required."),
  option4: z.string().min(1, "Option 4 is required."),
  answer: z.string().min(1, "You must select a correct answer."),
  storylineHintKey: z.string().min(3, "Storyline hint key is required."),
  fallbackHint: z.string().min(10, "Fallback hint must be at least 10 characters."),
});

export default function AddQuestionForm() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      answer: "",
      storylineHintKey: "",
      fallbackHint: "",
    },
  });

  const options = form.watch(["option1", "option2", "option3", "option4"]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
        toast({ title: "Error", description: "You must be logged in.", variant: "destructive" });
        return;
    }
    setIsSubmitting(true);
    try {
      const result = await addQuestionAction(values, user.username);
      if (result.success) {
        toast({
          title: "Success!",
          description: `Question "${result.questionId}" has been added to the database.`,
        });
        form.reset();
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "An Unexpected Error Occurred",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <Card className="max-w-3xl mx-auto bg-card/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>New Question Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question Text</FormLabel>
                  <FormControl>
                    <Textarea placeholder="What famous castle is on Dark Island?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <FormField
                    control={form.control}
                    name="option1"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Option 1</FormLabel>
                        <FormControl><Input placeholder="Boldt Castle" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField
                    control={form.control}
                    name="option2"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Option 2</FormLabel>
                        <FormControl><Input placeholder="Singer Castle" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField
                    control={form.control}
                    name="option3"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Option 3</FormLabel>
                        <FormControl><Input placeholder="Castle Rest" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField
                    control={form.control}
                    name="option4"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Option 4</FormLabel>
                        <FormControl><Input placeholder="Jorstad Castle" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correct Answer</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the correct option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {options.map((opt, index) => (
                        opt && <SelectItem key={index} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    This must match one of the options you provided above.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="storylineHintKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Storyline Hint Key</FormLabel>
                  <FormControl><Input placeholder="e.g., singer_castle_2" {...field} /></FormControl>
                   <FormDescription>
                    This links the question to a piece of lore. Must be unique.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fallbackHint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fallback Hint</FormLabel>
                  <FormControl>
                    <Textarea placeholder="This castle was built for the president of a sewing machine company." {...field} />
                  </FormControl>
                   <FormDescription>
                    This is the hint the AI pirate will read aloud.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting ? "Submitting..." : "Add Question to Database"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
