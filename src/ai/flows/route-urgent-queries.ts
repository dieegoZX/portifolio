'use server';

/**
 * @fileOverview Routes urgent or positive contact form inquiries to the top of the queue using sentiment analysis.
 *
 * - routeUrgentQueries - A function that analyzes the sentiment of an inquiry and returns a priority score.
 * - RouteUrgentQueriesInput - The input type for the routeUrgentQueries function.
 * - RouteUrgentQueriesOutput - The return type for the routeUrgentQueries function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RouteUrgentQueriesInputSchema = z.object({
  inquiry: z
    .string()
    .describe('The user inquiry from the contact form.'),
});
export type RouteUrgentQueriesInput = z.infer<typeof RouteUrgentQueriesInputSchema>;

const RouteUrgentQueriesOutputSchema = z.object({
  priorityScore: z
    .number()
    .describe('A score indicating the priority of the inquiry. Higher values indicate higher priority.'),
});
export type RouteUrgentQueriesOutput = z.infer<typeof RouteUrgentQueriesOutputSchema>;

export async function routeUrgentQueries(input: RouteUrgentQueriesInput): Promise<RouteUrgentQueriesOutput> {
  return routeUrgentQueriesFlow(input);
}

const sentimentAnalysisPrompt = ai.definePrompt({
  name: 'sentimentAnalysisPrompt',
  input: {schema: RouteUrgentQueriesInputSchema},
  output: {schema: RouteUrgentQueriesOutputSchema},
  prompt: `You are an AI assistant tasked with analyzing the sentiment of user inquiries from a contact form.

  Your goal is to determine the priority of the inquiry based on its urgency and positivity. High urgency or positive sentiment should result in a higher priority score.

  Analyze the following inquiry:
  """{{inquiry}}"""

  Provide a priority score between 0 and 10. A score of 0 indicates low priority, while a score of 10 indicates the highest priority.  Take into account any factors which might make an inquiry urgent (such as mentioning a deadline), or might indicate that a customer is already happy and close to making a deal.

  Considerations for determining the priority score:
  - Urgency: Does the inquiry indicate an urgent need or deadline?
  - Sentiment: Is the overall sentiment of the inquiry positive, negative, or neutral?
  - Clarity: Is the inquiry clear and easy to understand?

  Return only a single number between 0 and 10 representing the priority score of this inquiry.
  `,
});

const routeUrgentQueriesFlow = ai.defineFlow(
  {
    name: 'routeUrgentQueriesFlow',
    inputSchema: RouteUrgentQueriesInputSchema,
    outputSchema: RouteUrgentQueriesOutputSchema,
  },
  async input => {
    const {output} = await sentimentAnalysisPrompt(input);
    return output!;
  }
);
