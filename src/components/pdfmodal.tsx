import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import PDFViewer from '@/components/PDFViewer'


type Props = {
    pdfUrl: string
}

export function DialogDemo(props: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost"className="text-white">View Context PDF</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] dark">
        <DialogHeader>
          <DialogTitle className="text-white">PDF Provided</DialogTitle>
          <DialogDescription>
            View the PDF provided as your context
          </DialogDescription>
        </DialogHeader>
        <div className="flex">
            <PDFViewer pdf_url={props.pdfUrl} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
