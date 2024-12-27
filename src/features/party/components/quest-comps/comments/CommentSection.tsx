import {
  Button,
  Group,
  ScrollArea,
  Stack,
  Textarea,
  Title,
  Text,
} from "@mantine/core";
import {
  useAddComment,
  useDeleteComment,
  useEditComment,
} from "../../../api/quest";
import { QuestComment } from "../../../shared/quest.types";
import { useState } from "react";

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

  return (
    <Stack gap={4}>
      <Title order={5}>Comments</Title>
      {comments.length > 0 ? (
        <ScrollArea h={200}>
          {comments.map((comment) => (
            <Group key={comment.id}>
              <Text size="sm">{comment.content}</Text>
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
