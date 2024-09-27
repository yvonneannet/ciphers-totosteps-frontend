import { NextResponse } from 'next/server';
const baseURL = process.env.BASE_URL

export async function GET() {
  try {
    const response = await fetch(`${baseURL}/api/milestones/`);
    const milestones = await response.json();

    const uniqueMilestones = new Set(
      milestones.map((milestone: { name: string }) => milestone.name)
    );

    return NextResponse.json({ milestoneCount: uniqueMilestones.size });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching milestones' + (error as Error).message}, { status: 500 });
  }
}
