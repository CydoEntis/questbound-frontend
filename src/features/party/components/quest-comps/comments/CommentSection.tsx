import {
  Button,
  Group,
  Stack,
  Textarea,
  Title,
  Text,
  Paper,
  Flex,
  ActionIcon,
} from "@mantine/core";
import { useAddComment, useDeleteComment } from "../../../api/quest";
import { QuestComment } from "../../../shared/quest.types";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import AvatarDisplay from "../../../../avatar/components/avatar-display/AvatarDisplay";
import useUserStore from "../../../../../stores/useUserStore";
import useGetColorTheme from "../../../../../components/theme/hooks/useGetColorScheme";

function CommentSection({
  questId,
  comments,
}: {
  questId: number;
  comments: QuestComment[];
}) {
  const { userId } = useUserStore();
  const [newComment, setNewComment] = useState("");
  const addComment = useAddComment();
  const deleteComment = useDeleteComment();
  const { isLightMode } = useGetColorTheme();

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;
    await addComment.mutateAsync({ questId, content: newComment });
    setNewComment("");
  };

  const handleDeleteComment = async (commentId: number) => {
    await deleteComment.mutateAsync({ questId, commentId });
  };

  const lightModeColor = "#F1EDFE";
  const darkModeColor = "#312B43";
  const lightModeTextColor = "black";
  const darkModeTextColor = "white";

  return (
    <Stack gap={4}>
      <Title order={5}>Comments</Title>

      <Textarea
        classNames={{ input: "input" }}
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

      {comments.length > 0 ? (
        <Stack gap={8}>
          {comments.map((comment) => {
            const isCurrentUser = comment.partyMember.id === userId;
            return (
              <Flex
                key={comment.id}
                justify={isCurrentUser ? "flex-end" : "flex-start"}
                w="100%"
              >
                <Paper
                  withBorder
                  bg={
                    isCurrentUser
                      ? isLightMode
                        ? lightModeColor
                        : darkModeColor
                      : "card"
                  }
                  p={8}
                  w="70%"
                  style={{
                    alignSelf: isCurrentUser ? "flex-end" : "flex-start",
                  }}
                >
                  <Stack>
                    <Flex justify="space-between" align="center">
                      <Group>
                        <AvatarDisplay avatar={comment.partyMember.avatar} />
                        <Text>{comment.partyMember.username}</Text>
                      </Group>
                      {isCurrentUser && (
                        <ActionIcon
                          variant="light"
                          color="red"
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          <Trash2 size={20} />
                        </ActionIcon>
                      )}
                    </Flex>
                    <Text
                      size="sm"
                      mt={2}
                      style={{
                        color: isCurrentUser
                          ? isLightMode
                            ? lightModeTextColor
                            : darkModeTextColor
                          : "inherit",
                      }}
                    >
                      {comment.content}
                    </Text>
                  </Stack>
                </Paper>
              </Flex>
            );
          })}
        </Stack>
      ) : (
        <Text size="sm" c="dimmed">
          No comments yet. Be the first to add one!
        </Text>
      )}
    </Stack>
  );
}

export default CommentSection;
