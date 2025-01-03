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
  ScrollArea,
} from "@mantine/core";
import { useAddComment, useDeleteComment } from "../../../api/quest";
import { QuestComment } from "../../../shared/quest.types";
import { useState, useRef } from "react";
import { Trash2 } from "lucide-react";
import AvatarDisplay from "../../../../avatar/components/avatar-display/AvatarDisplay";
import useUserStore from "../../../../../stores/useUserStore";
import useGetColorTheme from "../../../../../components/theme/hooks/useGetColorScheme";
import { formatDate } from "../../../../../shared/utils/date.utils";
import { MEMBER_ROLES } from "../../../../../shared/utils/constants";
import { PartyMember } from "../../../../party-member/shared/party-members.types";

function CommentSection({
  questId,
  comments,
  partyMembers,
}: {
  questId: number;
  comments: QuestComment[];
  partyMembers: PartyMember[];
}) {
  const { userId } = useUserStore();
  const [newComment, setNewComment] = useState("");
  const addComment = useAddComment();
  const deleteComment = useDeleteComment();
  const { isLightMode } = useGetColorTheme();

  const scrollToBottom = () =>
    viewport.current!.scrollTo({
      top: viewport.current!.scrollHeight,
      behavior: "smooth",
    });

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;
    await addComment.mutateAsync({ questId, content: newComment });
    setNewComment("");
    scrollToBottom();
  };

  const handleDeleteComment = async (commentId: number) => {
    await deleteComment.mutateAsync({ questId, commentId });
  };

  const lightModeColor = "#F1EDFE";
  const darkModeColor = "#312B43";
  const lightModeTextColor = "black";
  const darkModeTextColor = "white";

  const viewport = useRef<HTMLDivElement>(null);

  const currentUserRole = partyMembers.find(
    (member) => member.userId === userId
  )?.role;

  const isLeaderOrCaptain =
    currentUserRole === MEMBER_ROLES.LEADER ||
    currentUserRole === MEMBER_ROLES.CAPTAIN;

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

      <ScrollArea h={400} viewportRef={viewport}>
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
                  >
                    <Stack>
                      <Flex justify="space-between" align="center">
                        <Group>
                          <AvatarDisplay avatar={comment.partyMember.avatar} />
                          <Stack gap={2}>
                            <Text>{comment.partyMember.username}</Text>
                            <Text c="dimmed" size="0.7rem">
                              {formatDate(comment.createdAt)}
                            </Text>
                          </Stack>
                        </Group>
                        {(isCurrentUser || isLeaderOrCaptain) && ( // Show delete button for current user or leaders/captains
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
      </ScrollArea>
    </Stack>
  );
}

export default CommentSection;
