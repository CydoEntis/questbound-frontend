// import { z } from "zod";
// import { useForm, zodResolver } from "@mantine/form";
// import { AxiosError } from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import {
// 	ActionIcon,
// 	Button,
// 	Flex,
// 	MultiSelect,
// 	Select,
// 	Stack,
// 	Textarea,
// 	TextInput,
// 	Text,
// } from "@mantine/core";
// import classes from "../auth/auth.module.css";
// import { DateInput } from "@mantine/dates";
// import { Trash2 } from "lucide-react";

// type UpsertQuestProps = {
// 	quest?: Quest;
// 	onClose: () => void;
// };

// function UpsertQuestForm({ quest, onClose }: UpsertQuestProps) {
// 	const { partyId, questId } = useParams();
// 	const { createQuest, updateQuest } = useQuestStore();
// 	const { getMembers, members } = useMemberStore();
// 	const navigate = useNavigate();

// 	const questSchema = z.object({
// 		title: z
// 			.string()
// 			.min(3, "Title must be more than 3 characters")
// 			.max(50, "Title cannot exceed 50 characters"),
// 		description: z
// 			.string()
// 			.min(5, "Description must be more than 5 characters")
// 			.max(120, "Description cannot exceed 120 characters"),
// 		dueDate: z.date({ required_error: "Due date is required" }).refine(
// 			(date) => {
// 				const isEditing = !!quest;
// 				const today = new Date();
// 				today.setHours(0, 0, 0, 0);
// 				const selectedDate = new Date(date);
// 				selectedDate.setHours(0, 0, 0, 0);

// 				return isEditing || selectedDate >= today;
// 			},
// 			{
// 				message: "Due date cannot be in the past",
// 			},
// 		),
// 		priority: z.string(),
// 		members: z
// 			.array(z.string())
// 			.min(1, "At least one member must be assigned to the quest"),
// 		steps: z
// 			.array(z.string().min(1, "Task cannot be empty"))
// 			.max(10)
// 			.optional(),
// 	});

// 	type QuestData = z.infer<typeof questSchema>;

// 	const form = useForm<QuestData>({
// 		validate: zodResolver(questSchema),
// 		initialValues: {
// 			title: "",
// 			description: "",
// 			dueDate: new Date(),
// 			priority: PriorityLevel.LOW.toString(),
// 			members: [],
// 			steps: [],
// 		},
// 	});

// 	const handleAddTask = () => {
// 		if (form.values.steps && form.values.steps.length < 10) {
// 			form.insertListItem("steps", "");
// 		}
// 	};

// 	const handleRemoveTask = (index: number) => {
// 		form.removeListItem("steps", index);
// 	};

// 	const createNewQuest = async (data: QuestData) => {
// 		if (partyId) {
// 			const newQuest = {
// 				partyId: Number(partyId),
// 				title: data.title,
// 				priority: Number(data.priority),
// 				description: data.description,
// 				dueDate: data.dueDate,
// 				memberIds: data.members.map(Number),
// 				steps: (data.steps || []).map((task) => ({
// 					description: task,
// 				})) as CreateStep[],
// 			};

// 			await createQuest(partyId, newQuest);
// 		}
// 	};

// 	const updateExistingQuest = async (data: QuestData) => {
// 		if (partyId && quest) {
// 			("updating??");
// 			const updatedQuest = {
// 				id: quest.id,
// 				partyId: Number(partyId),
// 				title: data.title,
// 				priority: Number(data.priority), 
// 				description: data.description,
// 				dueDate: data.dueDate,
// 				memberIds: data.members.map(Number),
// 				steps: (data.steps || []).map((task, index) => {
// 					const existingStep = quest?.steps[index];
// 					return {
// 						id: existingStep ? existingStep.id : undefined,
// 						description: task,
// 					} as Step;
// 				}),
// 			};
// 			await updateQuest(partyId, quest.id.toString(), updatedQuest);
// 		}
// 	};

// 	async function onSubmit(data: QuestData) {
// 		try {
// 			if (quest) {
// 				await updateExistingQuest(data);
// 			} else {
// 				await createNewQuest(data);
// 			}
// 			navigate(`/parties/${partyId}/quests`);
// 			form.reset();
// 			onClose();
// 		} catch (error) {
// 			if (error instanceof AxiosError && error.response?.data?.errors) {
// 				const errors = error.response.data.errors as Record<string, string[]>;
// 				const fieldErrors: Record<string, string> = {};

// 				for (const [key, messages] of Object.entries(errors)) {
// 					if (Array.isArray(messages) && messages.length > 0) {
// 						fieldErrors[key] = messages[0];
// 					}
// 				}

// 				form.setErrors(fieldErrors);
// 			}
// 		}
// 	}

// 	return (
// 		<form onSubmit={form.onSubmit(onSubmit)}>
// 			<Stack gap={8}>
// 				<TextInput
// 					label="Title"
// 					placeholder="Name of your Quest?"
// 					classNames={{
// 						input: classes.input,
// 					}}
// 					{...form.getInputProps("title")}
// 				/>
// 				<Textarea
// 					label="Description"
// 					placeholder="Describe your quest"
// 					autosize
// 					{...form.getInputProps("description")}
// 				/>
// 				<DateInput
// 					label="Due Date"
// 					placeholder="Due Date"
// 					{...form.getInputProps("dueDate")}
// 					color="violet"
// 				/>
// 				<MultiSelect
// 					label="Member List"
// 					placeholder="Assign Members"
// 					data={members?.items.map((member) => ({
// 						value: member.id.toString(),
// 						label: member.displayName,
// 					}))}
// 					searchable
// 					{...form.getInputProps("members")}
// 				/>
// 				<Select
// 					label="Priority Level"
// 					placeholder="Assign a Priority Level"
// 					data={[
// 						{ value: PriorityLevel.CRITICAL.toString(), label: "Critical" },
// 						{ value: PriorityLevel.HIGH.toString(), label: "High" },
// 						{ value: PriorityLevel.MEDIUM.toString(), label: "Medium" },
// 						{ value: PriorityLevel.LOW.toString(), label: "Low" },
// 					]}
// 					{...form.getInputProps("priority")}
// 					value={
// 						form.values.priority !== undefined
// 							? form.values.priority.toString()
// 							: PriorityLevel.LOW.toString()
// 					}
// 				/>

// 				<Stack
// 					gap={8}
// 					py={8}
// 				>
// 					<Text size="sm">Steps</Text>
// 					{(form.values.steps ?? []).map((_, index) => (
// 						<Flex
// 							key={index}
// 							gap={8}
// 							align="center"
// 						>
// 							<Text>#{index + 1}.</Text>
// 							<TextInput
// 								placeholder="Task description"
// 								{...form.getInputProps(`steps.${index}`)}
// 								classNames={{ input: classes.input }}
// 							/>
// 							<ActionIcon
// 								color="red"
// 								variant="light"
// 								onClick={() => handleRemoveTask(index)}
// 							>
// 								<Trash2 size={16} />
// 							</ActionIcon>
// 						</Flex>
// 					))}
// 					{(form.values.steps ?? []).length < 10 && (
// 						<Button
// 							color="violet"
// 							variant="light"
// 							onClick={handleAddTask}
// 						>
// 							Add Task
// 						</Button>
// 					)}
// 				</Stack>
// 			</Stack>
// 			<Button
// 				fullWidth
// 				mt="xl"
// 				color="violet"
// 				variant="light"
// 				type="submit"
// 			>
// 				{quest ? "Update Quest" : "Create Quest"}
// 			</Button>
// 		</form>
// 	);
// }

// export default UpsertQuestForm;
