import { useForm, zodResolver } from "@mantine/form";
import { useEffect } from "react";
import { AxiosError } from "axios";
import { Stack, TextInput } from "@mantine/core";
// import classes from "../../features/auth/auth.module.css";
import { UserResponse } from "../../auth/shared/types";
import { UpdateUsername } from "../shared/types";
import { updateUsernameSchema } from "../shared/schemas";

type UpdateUsernameFormProps = { user: UserResponse; onClose: () => void };

function UpdateUsernameForm({ user, onClose }: UpdateUsernameFormProps) {
	// const { updateUserUsername } = useAuthStore();

	const form = useForm<UpdateUsername>({
		validate: zodResolver(updateUsernameSchema),
		initialValues: {
			username: user?.username || "",
		},
	});

	const updateUpdateUsername = async (data: UpdateUsername) => {
		// await updateUserUsername(data.username);
	};

	async function onSubmit(data: UpdateUsername) {
		try {
			console.log("Submitting");
			if (user) {
				updateUpdateUsername(data);

				console.log(form.errors);
			}

			onClose();
			form.reset();
		} catch (error) {
			if (error instanceof AxiosError && error.response?.data?.errors) {
				console.error(error.response?.data?.errors);
				const errors = error.response.data.errors as Record<string, string[]>;
				const fieldErrors: Record<string, string> = {};

				for (const [key, messages] of Object.entries(errors)) {
					if (Array.isArray(messages) && messages.length > 0) {
						fieldErrors[key] = messages[0];
					}
				}

				form.setErrors(fieldErrors);
			}
		}
	}

	useEffect(() => {
		if (user) {
			form.setValues({
				username: user.username,
			});
		}
	}, [user]);

	return (
		<form
			id="updateUsernameForm"
			onSubmit={form.onSubmit(onSubmit)}
		>
			<Stack gap={12}>
				<TextInput
					label="Display Name"
					placeholder="New Display Name"
					// classNames={{
					// 	input: classes.input,
					// }}
					{...form.getInputProps("username")}
					w={300}
				/>
			</Stack>
		</form>
	);
}

export default UpdateUsernameForm;
