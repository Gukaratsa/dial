using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();
builder.Services.AddProblemDetails();
builder.Services.AddOpenApi();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options => options.AddPolicy("myCors", policy =>
{
    policy
        .AllowAnyHeader()
        .AllowAnyHeader()
        .AllowAnyOrigin();
}));

builder.Services.AddSingleton<Simulator>();
builder.Services.AddHostedService(sp => sp.GetRequiredService<Simulator>());

var app = builder.Build();

app.UseExceptionHandler();
app.MapOpenApi();
app.UseSwagger();
app.UseSwaggerUI();

app.MapGet("/GetValue", ([FromServices] Simulator sim) => { return sim.GetDto(); });
app.MapGet("/SetValue", (double value, [FromServices] Simulator sim) => { sim.SetValue(value); });
app.MapGet("/SetSpeed", (double speed, [FromServices] Simulator sim) => { sim.SetSpeed(speed); });

app.MapDefaultEndpoints();
app.UseCors("myCors");

app.Run();

class SimulatorOptions
{
    public const string SectionName = "Simulator";
    public bool UseClamped { get; set; } = false;
    public TimeSpan Intervall { get; set; } = TimeSpan.FromMilliseconds(100);
}

class Simulator : BackgroundService
{
    private readonly static object _value_lock = new();
    private readonly SimulatorOptions _options;

    private double Value { get; set; }
    private double Speed { get; set; }

    public Simulator(IServiceProvider serviceProvider)
    {
        _options = serviceProvider.GetService<IOptions<SimulatorOptions>>()?.Value ?? new();
    }

    public void SetValue(double newValue)
    {
        lock (_value_lock)
        {
            Value = newValue;
        }
    }

    public void SetSpeed(double newSpeed)
    {
        lock (_value_lock)
        {
            Speed = newSpeed;
        }
    }

    public TimeSpan Intervall { get; set; } = TimeSpan.FromMilliseconds(100);

    public ValueDTO GetDto()
    {
        lock (_value_lock)
        {
            return new ValueDTO(Value, Speed > 0);
        }
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while(!stoppingToken.IsCancellationRequested)
        {
            lock(_value_lock)
            {
                var deltaDist = _options.Intervall.TotalSeconds * Speed;
                if (_options.UseClamped)
                {
                    Value = (Value + deltaDist * Speed) % 100;
                    if (Value < 0)
                        Value += 100;
                }
                else
                    Value = (Value + deltaDist);
            }

            await Task
                .Delay(_options.Intervall, stoppingToken)
                .ConfigureAwait(false);
        }
    }
}

record ValueDTO(double Value, bool Positive);