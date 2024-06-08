import { TypedResponse, json } from "@remix-run/node";

type ResponseBody<T> = {
	data?: T | null;
	error?: string | null;
	message?: string | null;
};

type ResponseProps<T> = {
	data?: ResponseBody<T>["data"];
	error?: ResponseBody<T>["error"];
	message?: ResponseBody<T>["message"];
	statusCode: number;
	jsonify: () => TypedResponse<ResponseBody<T>>;
};

export class DataResponse<T> implements ResponseProps<T> {
	data?: T | null;
	error?: string | null;
	message?: string | null;
	statusCode: number;

	constructor(
		{ data, error, message }: ResponseBody<T>,
		statusCode?: number
	) {
		this.data = data ?? null;
		this.error = error ?? null;
		this.message = message ?? null;
		this.statusCode = statusCode ?? 200;
	}

	jsonify(): TypedResponse<ResponseBody<T>> {
		return json(
			{ data: this.data, error: this.error, message: this.message },
			this.statusCode
		);
	}
}
