const TESTE_GRATIS_API_URL =
  process.env.TESTE_GRATIS_API_URL ||
  "https://apijobbadmin.sistemajobb.com.br/api/testegratis";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return Response.json(
      {
        status: false,
        mensagem: "Dados invalidos para cadastro.",
      },
      { status: 400 },
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const upstreamResponse = await fetch(TESTE_GRATIS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
      cache: "no-store",
    });

    const responseText = await upstreamResponse.text();
    let data: unknown;

    try {
      data = responseText ? JSON.parse(responseText) : {};
    } catch {
      data = {
        status: false,
        mensagem: "Resposta inesperada do servidor de cadastro.",
      };
    }

    return Response.json(data, { status: upstreamResponse.status });
  } catch {
    return Response.json(
      {
        status: false,
        mensagem:
          "Nao foi possivel conectar ao servidor de cadastro. Tente novamente em alguns instantes.",
      },
      { status: 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
