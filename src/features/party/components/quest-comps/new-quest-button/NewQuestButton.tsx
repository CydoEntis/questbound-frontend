import { Button } from "@mantine/core"
import { Plus } from "lucide-react"

type Props = {}

function NewQuestButton({}: Props) {
  return (
    <Button leftSection={<Plus size={20}/>} variant="light" color="violet">New Quest</Button>
  )
}

export default NewQuestButton