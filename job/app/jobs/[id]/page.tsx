import ViewJob from "@/components/pages/view_job";

export default async function JobDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  return <ViewJob jobId={id} />;
}

