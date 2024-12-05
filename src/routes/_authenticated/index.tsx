import { createFileRoute } from '@tanstack/react-router'
import { Title } from '@mantine/core'

export const Route = createFileRoute('/_authenticated/')({
  component: Index,
})

function Index() {
  return <Title>WELCOME TO THE APP U POS</Title>
}
