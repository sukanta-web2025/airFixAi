import type { AxiosError } from "axios";
// import { globalErrorService } from "../services/core/globalErrorService";
// import { showToast } from "../view/components/feedback/toast/toast.service";
import toast from "react-hot-toast";

interface ApiErrorResponse {
  message?: string;
  error?: string | { message?: string };
  msg?: string;
  detail?: string;
  errors?: Record<string, string[]>;
}

class ErrorHandler {

  handle(error: unknown) {

    const err = error as AxiosError<ApiErrorResponse>;

    console.error("[ErrorHandler]", {
      status: err.response?.status,
      data: err.response?.data,
      message: err.message,
    });

    /* NETWORK OR SERVER UNREACHABLE */

    if (!err.response) {

      const isOffline = !navigator.onLine;

      if (isOffline) {
        toast.error("No Internet Connection");
        /*
        globalErrorService.show({
          status: 0,
          message: "No Internet Connection",
        });
        */


      } else {
        toast.error("Server Unavailable");
        /*
        globalErrorService.show({
          status: 533,
          message: "Server Unavailable",
        });
        */

      }

      return;
    }

    const status = err.response.status;
    const data = err.response.data;

    /* VALIDATION ERRORS */

    if (data?.errors) {

      const formatted = Object.entries(data.errors)
        .map(([field, errors]) => {
          const label = field.replace(/_/g, " ");
          return `${label}: ${errors.join(", ")}`;
        })
        .join("\n");

      toast.error(formatted);

      return;
    }

    const message =
      data?.message ||
      (typeof data?.error === "string"
        ? data.error
        : data?.error?.message) ||
      data?.msg ||
      data?.detail ||
      err.message ||
      "Something went wrong";

    switch (status) {

      case 400:
      case 401:
      case 403:
        toast.error(message);
        break;

      case 404:
        toast.error("Resource not found");
        break;

      case 500:
      case 503:

        toast.error(message);

        /*
        globalErrorService.show({
          status,
          message,
        });
        */

        break;

      default:
        toast.error(message);
    }
  }
}

export const errorHandler = new ErrorHandler();
