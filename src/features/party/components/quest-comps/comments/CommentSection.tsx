import {
  Button,
  Group,
  ScrollArea,
  Stack,
  Textarea,
  Title,
  Text,
  Paper,
  Flex,
  ActionIcon,
} from "@mantine/core";
import {
  useAddComment,
  useDeleteComment,
  useEditComment,
} from "../../../api/quest";
import { QuestComment } from "../../../shared/quest.types";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import AvatarDisplay from "../../../../avatar/components/avatar-display/AvatarDisplay";

function CommentSection({
  questId,
  comments,
}: {
  questId: number;
  comments: QuestComment[];
}) {
  const [newComment, setNewComment] = useState("");
  const addComment = useAddComment();
  const editComment = useEditComment();
  const deleteComment = useDeleteComment();

  const handleAddComment = async () => {
    if (newComment.trim() === "") return; // Prevent adding empty comments
    await addComment.mutateAsync({ questId, content: newComment });
    setNewComment(""); // Clear the input after submission
  };

  const handleEditComment = async (commentId: number, content: string) => {
    await editComment.mutateAsync({ questId, commentId, content });
  };

  const handleDeleteComment = async (commentId: number) => {
    await deleteComment.mutateAsync({ questId, commentId });
  };

  console.log(comments);

  return (
    <Stack gap={4}>
      <Title order={5}>Comments</Title>
      {comments.length > 0 ? (
        <ScrollArea h={200}>
          {comments.map((comment) => (
            <Group key={comment.id}>
              <Paper bg="secondary" variant="light" withBorder p={8} w="100%">
                <Stack w="100%">
                  <Flex justify="space-between" align="center" w="100%">
                    <Group>
                      <AvatarDisplay avatar={comment.partyMember.avatar} />
                      <Text>{comment.partyMember.username}</Text>
                    </Group>
                    <ActionIcon variant="light" color="red">
                      <Trash2 size={20} />
                    </ActionIcon>
                  </Flex>
                </Stack>
                <Text size="sm" mt={12}>{comment.content}</Text>
              </Paper>
              <Group>
                <Button
                  size="xs"
                  variant="light"
                  color="blue"
                  onClick={() =>
                    handleEditComment(comment.id, "Updated content")
                  }
                >
                  Edit
                </Button>
                <Button
                  size="xs"
                  variant="light"
                  color="red"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  Delete
                </Button>
              </Group>
            </Group>
          ))}
        </ScrollArea>
      ) : (
        <Text size="sm" color="dimmed">
          No comments yet. Be the first to add one!
        </Text>
      )}
      <Textarea
        autosize
        minRows={2}
        maxRows={4}
        placeholder="Add a comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.currentTarget.value)}
      />
      <Group justify="end">
        <Button variant="light" color="violet" onClick={handleAddComment}>
          Add Comment
        </Button>
      </Group>
    </Stack>
  );
}

export default CommentSection;
