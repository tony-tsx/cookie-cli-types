declare namespace Types {
    namespace Command {
        namespace Detached {
            type Function<Args = Object> = (argv: string[], args: Args) => FunctionReturn;
        }
        type Function<Args = Object> = (argv: Array<string>, ctx: Config, args: Args) => FunctionReturn;
        type FunctionReturn = Promise<void> | void;
        namespace Option {
            type Value = string | boolean | number;
        }
        interface Option<T = (ctx: Config) => Option.Value> {
            name: string;
            description?: string;
            parse?: (val: string) => any;
            default?: Option.Value | T;
        }
    }
    interface Command<IsDetached extends boolean = false> {
        name: string;
        description?: string;
        options?: Command.Option<IsDetached extends true ? () => Command.Option.Value : (ctx: Config) => Command.Option.Value>[];
        detached?: IsDetached;
        examples?: ({
            desc: string;
            cmd: string;
        })[];
        pkg?: {
            name: string;
            version: string;
        };
        func: IsDetached extends true ? Command.Detached.Function : Command.Function;
    }
    interface Config {
        commands?: Command[];
    }
}
export = Types;
//# sourceMappingURL=index.d.ts.map