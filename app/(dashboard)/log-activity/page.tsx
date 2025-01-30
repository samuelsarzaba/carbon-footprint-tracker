"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useStore } from '@/lib/store';
import { EMISSION_FACTORS } from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const formSchema = z.object({
  type: z.enum(['TRANSPORT', 'DIET']),
  category: z.string(),
  value: z.number().min(0),
});

export default function LogActivityPage() {
  const [loading, setLoading] = useState(false);
  const addActivity = useStore((state) => state.addActivity);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 'TRANSPORT',
      category: 'CAR',
      value: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      let emissions = 0;
      if (values.type === 'TRANSPORT') {
        emissions = values.value * EMISSION_FACTORS.TRANSPORT[values.category as keyof typeof EMISSION_FACTORS.TRANSPORT];
      } else if (values.type === 'DIET') {
        emissions = EMISSION_FACTORS.DIET[values.category as keyof typeof EMISSION_FACTORS.DIET];
      }

      addActivity({
        date: new Date().toISOString(),
        type: values.type,
        category: values.category,
        value: values.value,
        emissions,
      });

      toast.success('Activity logged successfully');
      form.reset({
        type: 'TRANSPORT',
        category: 'CAR',
        value: 0,
      });
    } catch (error) {
      toast.error('Failed to log activity');
    }
    setLoading(false);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Log New Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <Tabs
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="w-full mb-6"
                >
                  <TabsList className="w-full">
                    <TabsTrigger className="flex-1" value="TRANSPORT">Transport</TabsTrigger>
                    <TabsTrigger className="flex-1" value="DIET">Diet</TabsTrigger>
                  </TabsList>
                </Tabs>
              )}
            />

            {form.watch('type') === 'TRANSPORT' && (
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transport Mode</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select transport mode" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="CAR">Car</SelectItem>
                        <SelectItem value="BUS">Bus</SelectItem>
                        <SelectItem value="BIKE">Bike</SelectItem>
                        <SelectItem value="WALK">Walk</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {form.watch('type') === 'DIET' && (
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diet Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select diet type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="MEAT_HEAVY">Meat Heavy</SelectItem>
                        <SelectItem value="MIXED">Mixed Diet</SelectItem>
                        <SelectItem value="VEGETARIAN">Vegetarian</SelectItem>
                        <SelectItem value="VEGAN">Vegan</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {form.watch('type') === 'TRANSPORT'
                      ? 'Distance (miles)'
                      : 'Number of Meals'}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Logging...' : 'Log Activity'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}